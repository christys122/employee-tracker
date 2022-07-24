const fs = require("fs");
const path = require("path");

const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
const Query = require("./query.js");
const query = new Query();

const questions = () => {
  console.log(`
        
    =================
    Employee Tracker
    =================
    `);
  inquirer
    .prompt([
      {
        type: "list",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          new inquirer.Separator(),
          "View All Roles",
          "Add Role",
          new inquirer.Separator(),
          "View All Departments",
          "Add Department",
          new inquirer.Separator(),
          "Quit",
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      if (answer.startMenu === "View All Employees") {
        viewEmployees();
        console.log("");
      }
      if (answer.startMenu === "Add Employee") {
        addEmployee();
      }
      if (answer.startMenu === "View All Departments") {
        viewDepartments();
        console.log("");
      }
      if (answer.startMenu === "View All Roles") {
        viewRoles();
        console.log("");
      }
      if (answer.startMenu === "Add Department") {
        addDepartment();
      }
      if (answer.startMenu === "Add Role") {
        addRole();
      }
      if (answer.startMenu === "Update Employee Role") {
        updateEmpRole();
      }
      if (answer.startMenu === "Quit") {
        quit();
      }
    });
};
//functions for Views
const quit = () => {
  console.log("Goodbye");
  //questions?
};

const viewEmployees = () => {
  const sql = `SELECT employees.first_name, last_name, roles.job_title, manager_id
                AS role
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id
                `;
  db.query(sql, (err, res) => {
    if (err) throw error;

    return console.table(res);
  });
  questions();
};

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, res) => {
    if (err) throw error;
    return console.table(res);
  });
  questions();
};

const viewRoles = () => {
  const sql = `SELECT roles.id, roles.job_title, roles.salary, departments.department_name
    AS Department
    FROM roles
    LEFT JOIN departments
    ON roles.dept_id = departments.id`;
  db.query(sql, (err, res) => {
    if (err) throw error;
    return console.table(res);
  });
  questions();
};

//questions for new adds
// Add Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "Enter Department Name",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO departments(department_name)
                VALUES(?)`;
      const params = [answer.addDept]; //returns array
      db.query(sql, params, (err, res) => {
        if (err) {
          throw error;
        } else {
          console.log("success");
          return res;
        }
      });
      questions();
    });
};
//add Role
function deptChoices() {
  db.query("SELECT * FROM departments", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      deptChoicesArr.push({ name: res[i].department_name, value: res[i].id });
    }
  });

  return deptChoicesArr;
}

const deptChoicesArr = [];

const addRole = () => {
  deptChoices();
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "Enter Title of new role",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary for role",
      },
      {
        type: "list",
        name: "dept",
        message: "Select Department",
        choices: deptChoicesArr,
      },
    ])
    .then((answer) => {
      console.log(answer);
      const sql = `INSERT INTO roles (job_title, salary, dept_id)
      VALUES (?,?,?)`;
      const params = [answer.addRole, answer.salary, answer.dept]; //returns array
      db.query(sql, params, (err, res) => {
        if (err) {
          throw error;
        } else {
          console.log("success");
          return res;
        }
      });
      questions();
    });
};

//Updates
//Update Employee Role
function empChoices() {
  db.query(
    `SELECT employees.first_name, last_name, roles.job_title
    AS role
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id`,
    function (err, res) {
      for (let i = 0; i < res.length; i++) {
        empChoicesArr.push({
          name: res[i].role_id,
          value: res[i].employees.id,
        });
      }
    }
  );

  return empChoicesArr;
}
const empChoicesArr = [];

const updateEmpRole = () => {
  inquirer
    .prompt([
      empChoices(),
      {
        type: "list",
        name: "selectEmployee",
        message: "Select employee to change role",
        choices: empChoicesArr,
      },
      {
        type: "input",
        name: "selectRole",
        message: "Select new Title",
        choices: ["1", "2"], //roleChoiceArr
      },
    ])
    .then((data) => {
      const sql1 = `UPDATE employees SET role_id = ?
                WHERE id = ?`;
      const params = [data.selectEmployee, data.selectRole];
      db.query(sql1, params, (err, res) => {
        if (err) throw error;
        return console.log(res);
      });
    });
};
//Add New Employee
const addEmployee = () => {
  let deptName;
  let role;
  let firstName;
  let lastName;

  query.viewRoles(db).then((roleInfo) => {
    console.log(roleInfo);
  });
  const roleChoices = roleInfo.map((row) => row.title);

  inquirer.prompt([
    roleChoices(),
    {
      name: "firstName",
      type: "input",
      message: "What is the employee first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee role?",
      choices: roleChoices,
    },
  ])

.then((emp)=>{
roleInfo.forEach((element) => {
  if (element.title === emp.role) {
    role = element.id;
    deptName = element.department_name;

    firstName = emp.firstName;
    lastName = emp.lastName;
    role = emp.role;
}})
});

if (emp.role === "" || emp) {
  Query.addEmployeeAsManager(db, firstName, LastName, roleID).then((res) => {
    console.log(res);
    /// fun asking user what function they need perform
  });
}

//Extras
const viewBudgetbyDept = () => {
  const sql = `SELECT roles.id, roles.job_title, roles.salary, departments.department_name
    AS Department
    FROM roles
    LEFT JOIN departments
    ON roles.dept_id = departments.id`;
  db.query(sql, (err, res) => {
    if (err) throw error;
    return console.table(res);
  });
  questions();
};
const viewEmployeesbyDept = () => {
  const sql = `SELECT employees.first_name, last_name, roles.job_title, manager_id
                AS role
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id
                `;
  db.query(sql, (err, res) => {
    if (err) throw error;

    return console.table(res);
  });
  questions();
}; 
}

}
questions();
