INSERT INTO departments (department_name)
VALUES
('Finance'),
('Sales'),
('Engineering'),
('Legal'),
('Marketing'),
('Service');

INSERT INTO roles (job_title, salary, dept_id)
VALUES
('Sales Lead', 10000, 2),
('Salesperson', 80000, 2),
('Lead Engineer', 150000, 3),
('Software Engineer', 120000, 3),
('Account Manager', 160000, 1),
('Accountant', 125000, 1),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4),
('Marketing Lead', 150000, 5),
('Web Developer',80000, 5),
('Service Lead', 90000, 6),
('Customer Service Rep', 70000, 6);


INSERT INTO employees (first_name, last_name, hire_date, role_id, manager_id)
VALUES
('Nick', 'Diamond', '2008-01-01', 1, NULL),
('Angel', 'Huff', '2005-01-17', 6, 5),
('Orlando', 'Russell', '2010-03-19', 5, 8),
('Gary', 'Jones', '2020-05-19', 7, NULL),
('Margarita', 'Silva', "2019-08-07", 4, 3),
('Terrell', 'Lloyd', '2020-08-14', 2, 1),
('Thelma', 'Parsons', '2018-06-07', 8, 7),
('Lola', 'Weaver', '2015-08-14', 3, NULL),
('Arthur', 'Lane', '2020-05-23', 5, NULL),
('Doris', 'Soto', '2021-02-20', 10, 9), 
('Darnell', 'Martinez', '2017-01-09', 9, NULL),
('Clint', 'Myers', '2018-04-11', 11, 10),
('Dana', 'Mckinney', '2016-02-18', 11, 10);


