const mysql = require('mysql2');
const express = require('express');
const cTable = require('console.table');
const PORT = process.env.PORT || 3004;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

app.use((req, res) => {
    res.status(404).end();
  });




  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });