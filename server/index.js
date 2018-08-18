const http = require('http').Server();
const querystring = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const MongoOplog = require('mongo-oplog');
const config = require('./config');

const dbQuerystring = querystring.stringify({
	ssl: true,
	replicaSet: config.DB_REPLICA_SET,
	authSource: 'admin'
});

function getDbURI(dbName) {
	return `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}/${dbName}?${dbQuerystring}`;
}

MongoClient.connect(getDbURI(config.DB_NAME), (err, client) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Connected to Mongo database');
});


const oplog = MongoOplog(getDbURI('local'));

oplog.tail()
	.then(() => {
		console.log('Tailing Mongo oplog');
	})
	.catch((err) => {
		console.log(err);
	});

oplog.on('error', (err) => {
	console.log(err);
});

oplog.on('op', (data) => {
	console.log(data);
});

http.listen(3000, () => {});