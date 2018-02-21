/**
 * THIS FILE WAS ADDED AUTOMATICALLY by the Sails 1.0 app migration tool.
 */

module.exports.datastores = {
  // In previous versions, datastores (then called 'connections') would only be loaded
  // if a model was actually using them.  Starting with Sails 1.0, _all_ configured
  // datastores will be loaded, regardless of use.  So we'll only include datastores in
  // this file that were actually being used.  Your original `connections` config is
  // still available as `config/connections-old.js.txt`.
  'somePostgresqlServer': {
    adapter: 'sails-postgresql',
    host: 'localhost',
    user: 'alac',
    database: 'alac',
    password: 'alac',
    port: 5432
    // host: process.env.pg_host,
    // user: process.env.pg_user,
    // database: process.env.pg_db,
    // password: process.env.pg_password,
    // port: process.env.pg_port
  }
};
