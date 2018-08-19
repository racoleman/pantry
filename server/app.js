const MongoClient = require('mongodb').MongoClient;
const MongoOplog = require('mongo-oplog');
const querystring = require('querystring');
const config = require('./config');

const mongoEventMap = {
	d: 'delete',
	i: 'insert',
	u: 'update'
};

const http = require('http').createServer();
const io = require('socket.io')(http);

function getDbURI(dbName) {
	let url = `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}`;
	if (dbName) url += `/${dbName}`;
	url += `?${querystring.stringify(config.DB_QUERY_PARAMS)}`;
	return url;
}

let oplog, collection;

const app = {
	init() {
		http.listen(3001);

		this.initDb();
		this.initSocket();
		this.initOplog();
	},

	async initDb() {
		try {
			const client = await MongoClient.connect(getDbURI());
			collection = client.db(config.DB_NAME).collection(config.DB_COLLECTION);
			console.log('Connected to Mongo database');
		} catch(err) {
			console.error(err);
		}
	},

	initSocket() {
		io.on('connection', async (socket) => {
			console.log('User connected');

			const items = await collection.find().toArray();
			socket.emit('items', items);
		});

		io.on('disconnection', () => {
			console.log('User disconnected');
		});
	},

	async initOplog() {
		oplog = MongoOplog(getDbURI('local'));
		try {
			await oplog.tail();
			console.log('Tailing Mongo oplog');
			oplog.on('op', this.proxyDbEvent);
			oplog.on('error', console.error);
		} catch(err) {
			console.error(err);
		}
	},

	proxyDbEvent({ ns, op: event, o: data }) {
		// mongo-oplog uses a regex namespace, which the Atlas free tier does not support,
		// so we must filter it here instead
		if( ns.indexOf(config.DB_NAME) < 0) return;

		const socketEvent = mongoEventMap[event];
		if (socketEvent) {
			console.info(`${socketEvent} performed on ${ns}`);
			io.emit(socketEvent, data);
		} else {
			console.warn(`No event mapping specified for Mongo op '${event}'`);
		}
	}
};

module.exports = app;