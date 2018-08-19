const http = require('http').Server();
const io = require('socket.io')(http);
const MongoOplog = require('mongo-oplog');
const querystring = require('querystring');
const config = require('./config');

const mongoEventMap = {
	d: 'delete',
	i: 'insert',
	u: 'update'
};

function getDbURI(dbName) {
	const dbQuerystring = querystring.stringify(config.DB_QUERY_PARAMS);
	return `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}/${dbName}?${dbQuerystring}`;
}

let oplog;

const app = {
	init() {
		oplog = MongoOplog(getDbURI('local'));
		oplog.tail()
			.then(() => {
				console.log('Tailing Mongo oplog');
				this.bindOplogEvents();
			})
			.catch((err) => {
				console.log(err);
			});
	},

	bindOplogEvents() {
		oplog.on('op', this.proxyDbEvent);
		oplog.on('error', console.error);
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