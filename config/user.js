const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const { OPEN_READWRITE, OPEN_CREATE } = require('sqlite3');
const connection = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite'
});

const User = connection.define('users', {
	id: {
		type: sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: sequelize.TEXT,
	hash: sequelize.TEXT,
	salt: sequelize.TEXT,
	admin: sequelize.BOOLEAN
});

connection.sync().then(() => {
	console.log("Database connection successful!");
});

module.exports = User;
