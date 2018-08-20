const querystring = require('querystring');
const config = require('./config');

const utils = {
	getDbURI(dbName) {
		let url = `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}`;
		if (dbName) url += `/${dbName}`;
		url += `?${querystring.stringify(config.DB_QUERY_PARAMS)}`;
		return url;
	}
};

module.exports = utils;