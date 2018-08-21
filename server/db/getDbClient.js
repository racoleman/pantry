const { MongoClient, ObjectID } = require('mongodb');
const config = require('../config');

let db;

function getIdFilter(id) {
	return { _id: new ObjectID(id) }
}

function getDbClient(uri) {
	if (db) return db;

	let mongoClient;

	return db = {
		async getClient() {
			if (mongoClient) return mongoClient;

			try {
				mongoClient = await MongoClient.connect(uri);
				console.log('Connected to Mongo database');
				return mongoClient;
			} catch(err) {
				console.error(err);
			}
		},

		async getCollection() {
			const client = await this.getClient();
			return client.db(config.DB_NAME).collection(config.DB_COLLECTION);
		},

		async getAllItems() {
			const collection = await this.getCollection();
			return collection.find().toArray();
		},

		async addItem(item) {
			const collection = await this.getCollection();
			return collection.insertOne(item);
		},

		async updateItem(item) {
			const collection = await this.getCollection();
			const filter = getIdFilter(item._id);
			delete item._id;
			return collection.findOneAndUpdate(filter, { $set: item });
		},

		async deleteItem(id) {
			const collection = await this.getCollection();
			return collection.findOneAndDelete(getIdFilter(id));
		}
	}
}

module.exports = getDbClient;