const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GreenNoodle25!',
    database: 'emp_tracker_db'
},
console.log('Connected to the emp_tracker_db database.'));

module.exports = db;