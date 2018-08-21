const test = require('tape');
const getDbClient = require('./getDbClient');

function getClientWithMocks() {
	return Object.assign({}, getDbClient(), {
		clientIsReady: false,
		async getClient() {
			await new Promise((resolve) => {
				if (this.clientIsReady) resolve();
			});
			return {
				db() {
					return { collection() { return true; } };
				}
			}
		}
	});
}

test('getCollection() waits for a client', async (t) => {
	const db = getClientWithMocks();
	const collection = db.getCollection()
		.then(() => t.fail('Returned before ready'));

	t.ok(collection instanceof Promise, 'return value is a Promise');
	t.end();
});