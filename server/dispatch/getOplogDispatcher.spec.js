const test = require('tape');
const getOplogDispatcher = require('./getOplogDispatcher');
const { actionConstants } = require ('../actionConstants');

const mockData = { key: 'value' };

function getMockSocketIo() {
	return {
		emitPayload: null,
		emit(event, data) {
			this.emitPayload = data;
		}
	};
}

test('Emits insert events with expected data', (t) => {
	const io = getMockSocketIo();
	const event = {
		ns: 'pantry.items',
		op: 'i',
		o: mockData
	};
	const expectedPayload = {
		type: actionConstants.ADD_ITEM,
		data: mockData
	};
	const dispatcher = getOplogDispatcher(null, io);
	dispatcher.proxyEvent(event);

	t.deepEqual(io.emitPayload, expectedPayload, 'Called io.emit() with expected data');
	t.end();
});

test('Emits update events with expected data', (t) => {
	const io = getMockSocketIo();
	const expectedPayload = {
		type: actionConstants.UPDATE_ITEM,
		data: mockData
	};
	const event = {
		ns: 'pantry.items',
		op: 'u',
		o: mockData
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.deepEqual(io.emitPayload, expectedPayload, 'Called io.emit() with expected data');
	t.end();
});

test('Emits delete events with expected data', (t) => {
	const io = getMockSocketIo();
	const expectedPayload = {
		type: actionConstants.DELETE_ITEM,
		data: mockData
	};
	const event = {
		ns: 'pantry.items',
		op: 'd',
		o: mockData
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.deepEqual(io.emitPayload, expectedPayload, 'Called io.emit() with expected data');
	t.end();
});

test('Does not emit events for unrecognized namespaces', (t) => {
	const io = getMockSocketIo();
	const event = {
		ns: 'something.else',
		op: 'i',
		o: mockData
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.notOk(io.emitPayload, 'Did not call io.emit()');
	t.end();
});