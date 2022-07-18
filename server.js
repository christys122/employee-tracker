const express = require('express');
const mysql = require('mysql2');
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
//SELECT ALL Query
app.get('/api/employees', (req, res) => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
res.status(500).json({ error: err.message });
    return;
  }
res.json({
    message: 'success',
    data: rows
  });
});
 });

//SELECT ONE Query
// app.get('/api/employees/:id', (req, res) => {
//   const sql = `SELECT * FROM employees WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: row
//     });
//   })
// });

//DELETE ONE Query by Id
app.delete('/api/employees/:id', (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
    
  });
});


//CREATE ONE Query New
// const sql = `INSERT INTO employees(first_name, last_name, hire_date, role_id, manager_id)
//         Values (?,?,?,?,?)`;
// const params = ['Ronald', 'Firbank', '2018-01-05', 1, 2];
// db.query(sql, params, (err, result) => {
//   if(err) {
//     console.log(err);
//   }
//     console.log(result);
// });

app.use((req, res) => {
  res.status(404).end();
});
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });