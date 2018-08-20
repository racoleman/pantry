const MongoOplog = require('mongo-oplog');
const config = require('../config');

const mongoEventMap = {
	d: 'delete',
	i: 'insert',
	u: 'update'
};

function getOplogDispatcher(oplogURI, io) {
	const init = async () => {
		const oplog = MongoOplog(oplogURI);
		oplog.on('op', proxyEvent);
		oplog.on('error', console.error);

		try {
			await oplog.tail();
			console.log('Tailing Mongo oplog');
		} catch (err) {
			console.error(err);
		}
	};

	const proxyEvent = ({ ns, op: event, o: data }) => {
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
	};



	return {
		init,
		proxyEvent
	};
}

module.exports = getOplogDispatcher;