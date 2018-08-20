const test = require('tape');
const getOplogDispatcher = require('./getOplogDispatcher');

function getMockSocketIo() {
	return {
		emitPayload: null,
		emit(event, data) {
			this.emitPayload = data;
		}
	};
}

function getMockPayload() {
	return { key: 'value' };
}

test('Emits insert events with expected data', (t) => {
	const io = getMockSocketIo();
	const data = getMockPayload();
	const event = {
		ns: 'pantry.items',
		op: 'i',
		o: data
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.equal(io.emitPayload, data, 'Called io.emit() with expected data');
	t.end();
});

test('Emits update events with expected data', (t) => {
	const io = getMockSocketIo();
	const data = getMockPayload();
	const event = {
		ns: 'pantry.items',
		op: 'u',
		o: data
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.equal(io.emitPayload, data, 'Called io.emit() with expected data');
	t.end();
});

test('Emits delete events with expected data', (t) => {
	const io = getMockSocketIo();
	const data = getMockPayload();
	const event = {
		ns: 'pantry.items',
		op: 'd',
		o: data
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.equal(io.emitPayload, data, 'Called io.emit() with expected data');
	t.end();
});

test('Does not emit events for unrecognized namespaces', (t) => {
	const io = getMockSocketIo();
	const event = {
		ns: 'something.else',
		op: 'i',
		o: { key: 'value' }
	};
	const dispatcher = getOplogDispatcher(null, io);

	dispatcher.proxyEvent(event);
	t.notOk(io.emitPayload, 'Did not call io.emit()');
	t.end();
});