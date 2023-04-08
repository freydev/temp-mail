const config = require('../knexfile');
const pg = require('knex')(config[process.env.NODE_ENV || 'development'])

export default pg;
