const { MongoClient, ObjectID } = require('mongodb');
const querystring = require('querystring');
const socketIo = require('socket.io');
const config = require('./config');
const utils = require('./utils');
const getOplogDispatcher = require('./dispatch/getOplogDispatcher');
const { actionConstants } = require('./actionConstants');

const http = require('http').createServer();

let collection;

const app = {
	init() {
		http.listen(3001);

		this.initDb();
		const io = this.initSocket();
		const dispatcher = getOplogDispatcher(utils.getDbURI('local'), io);
		dispatcher.init();
	},

	async initDb() {
		try {
			const client = await MongoClient.connect(utils.getDbURI());
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
			socket.emit('action', {
				type: actionConstants.SET_ITEMS,
				data: items
			});

			socket.on('action', ({ type, data }) => {
				const filter = { _id: new ObjectID(data._id) };
				switch (type) {
					case actionConstants.ADD_ITEM:
						collection.insertOne(data);
						break;
					case actionConstants.UPDATE_ITEM:
						delete data._id;
						collection.findOneAndUpdate(filter, { $set: data });
						break;
					case actionConstants.DELETE_ITEM:
						collection.findOneAndDelete(filter);
						break;
				}
			});
		});

		io.on('disconnection', () => {
			console.log('User disconnected');
		});
		return io;
	}
};

module.exports = app;