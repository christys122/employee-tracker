DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INTEGER,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(id)
    );

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    hire_date DATE, 
    -- need to show all fields in role
    role_id INTEGER NOT NULL,
    -- will link another employee as manager can be null
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
    -- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) 
);
