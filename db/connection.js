const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '7529Wish',
      database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db')
  );

  module.exports = db;
