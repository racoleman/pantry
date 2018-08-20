import io from 'socket.io-client';

const socketClient = io('http://localhost:3001');

function emitAction(action) {
	return dispatch => {
		socketClient.emit('action', action);
		dispatch(action);
	};
}

export default socketClient;
export { emitAction };