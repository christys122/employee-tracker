const express = require('express');
const router = express.Router();
const db = require('../db/connection');



//SELECT ALL Query
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*,roles.job_title
                AS Role
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id`;
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
  router.get('/employees/:id', (req, res) => {
    const sql = `SELECT employees.*, roles.job_title
                AS Role
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id
                WHERE employees.id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    })
  });
  
  //DELETE ONE Query by Id
  router.delete('/employees/:id', (req, res) => {
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
  router.post('/employees', ({ body }, res) => {
  const sql = `INSERT INTO employees(first_name, last_name, hire_date, role_id, manager_id)
          VALUES (?,?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.hire_date, body.role_id, body. manager_id];
  db.query(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  }); 
  
  //START DEPT Queries
  
  router.get('/departments', (req, res) => {
    const sql = `SELECT * departments`;
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
  
  router.get('/departments/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  
  //update employee role
  router.put('/employees/:id', (req, res) => {
    const sql = `UPDATE employees SET role_id = ?
                WHERE id =?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message});
          //check if found
      } else if (!result.affectedRows) {
        res.json({ 
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
      });
    });




    module.exports = router;