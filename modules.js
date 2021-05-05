require('dotenv').config()
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    pasword: process.env.PASSWORD,
    database: process.env.DATABASE
});

mysqlConnection.connect()

module.exports.SELECT = (tableName, data=[]) => {
    let query = `SELECT * FROM ${ tableName } ${ data.length > 0 ? ` WHERE ${ data[0].entries().map(x => {
        
    }).join(' AND ') }` : '' }`
    return Promise.resolve(
        mysqlConnection.query(`SELECT * FROM ${ tableName }`)
    )
}