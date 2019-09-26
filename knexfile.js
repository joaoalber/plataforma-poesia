module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'knexdb',
    }
  },


  pool: {},
  migrations: {
    directory: __dirname + '/db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },

  staging: {},

  test: {},

  production: {}

};

