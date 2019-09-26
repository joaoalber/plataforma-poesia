const config = require('../knexfile');
const knex = require('knex');
const environment = 'development';
const environmentConfig = config[environment];
const connection = knex(environmentConfig);

module.exports = connection;