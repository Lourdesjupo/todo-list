// db.js
require('dotenv').config();

const postgres = require('postgres'); ;
const connectionString = process.env.DATABASE_URL;
// console.log('DATABASE_URL:', process.env);
if (!connectionString) {
	console.error('DATABASE_URL no está definida');
	process.exit(1);
}


const sql = postgres(connectionString);
module.exports = sql;
