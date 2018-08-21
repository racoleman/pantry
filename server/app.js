const querystring = require('querystring');
const socketIo = require('socket.io');
const getDbClient = require('./db/getDbClient');
const config = require('./config');
const utils = require('./utils');
const getOplogDispatcher = require('./dispatch/getOplogDispatcher');
const { actionConstants } = require('./actionConstants');

const http = require('http').createServer();

const app = {
	init() {
		http.listen(3001);

		const io = this.initSocket();
		const dispatcher = getOplogDispatcher(utils.getDbURI('local'), io);
		dispatcher.init();
	},

	initSocket() {
		const io = socketIo(http);
		const db = getDbClient(utils.getDbURI());
		io.on('connection', async (socket) => {
			console.log('User connected');

			const items = await db.getAllItems();
			socket.emit('action', {
				type: actionConstants.SET_ITEMS,
				data: items
			});

			socket.on('action', ({ type, data }) => {
				switch (type) {
					case actionConstants.ADD_ITEM:
						db.addItem(data);
						break;
					case actionConstants.UPDATE_ITEM: {
						db.updateItem(data);
						break;
					}
					case actionConstants.DELETE_ITEM:
						db.deleteItem(data._id);
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