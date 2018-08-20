const MongoClient = require('mongodb').MongoClient;
const querystring = require('querystring');
const config = require('./config');
const getOplogDispatcher = require('./getOplogDispatcher');

const http = require('http').createServer();
const socketIo = require('socket.io');

function getDbURI(dbName) {
	let url = `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}`;
	if (dbName) url += `/${dbName}`;
	url += `?${querystring.stringify(config.DB_QUERY_PARAMS)}`;
	return url;
}

let collection;

const app = {
	init() {
		http.listen(3001);

		this.initDb();
		const io = this.initSocket();
		const dispatcher = getOplogDispatcher(getDbURI('local'), io);
		dispatcher.init();
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
		const io = socketIo(http);
		io.on('connection', async (socket) => {
			console.log('User connected');

			const items = await collection.find().toArray();
			socket.emit('items', items);
		});

		io.on('disconnection', () => {
			console.log('User disconnected');
		});
		return io;
	}
};

module.exports = app;