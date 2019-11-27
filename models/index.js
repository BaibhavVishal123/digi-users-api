var Sequelize = require('sequelize');
const yaml = require('js-yaml');
const fs = require('fs');
var path = require('path');

const User = require('./user');

const filePath = path.resolve(__dirname, '../config/config.yml');
let fileContents = fs.readFileSync(filePath, 'utf8');
let config = yaml.safeLoad(fileContents);

const { host, pool, username, password, database } = config.postgres;

// Create sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host,
    pool,
    dialect: 'postgres',
    logging: true
});

console.log("Sequlize instance created");

const models = {
    User: User(sequelize, Sequelize)
};

console.log("User Model Loaded");

// Add relations accordingly if any table related to "users table" is added

module.exports = models;