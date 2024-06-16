const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'employeeTracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    start();
});

function start() {
    inquirer
        .prompt({
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Roles', 'View All Employees', 'Update Employee Role'],
        })
        .then((answer) => {
            if (answer.start === 'Add Department') {
                addDepartment();
            } else if (answer.start === 'Add Role') {
                addRole();
            } else if (answer.start === 'Add Employee') {
                addEmployee();
            } else if (answer.start === 'View All Departments') {
                viewAllDepartments();
            } else if (answer.start === 'View All Roles') {
                viewAllRoles();
            } else if (answer.start === 'View All Employees') {
                viewAllEmployees();
            } else if (answer.start === 'Update Employee Role') {
                updateEmployeeRole();
            }
        });
};

function addDepartment() {
    inquirer
        .prompt({
            name: 'Name',
            type: 'input',
            message: 'What department would you like to add?',
        })
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.department,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    start();
                }
            );
        });
};

function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What role would you like to add?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?',
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the department ID for this role?',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    start();
                }
            );
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee first name?',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee last name?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the employee role ID?',
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the employee manager ID?',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    start();
                }
            );
        });
};

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'employee_id',
                type: 'input',
                message: 'What is the employee ID you would like to update?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the new role ID for this employee?',
            },
        ])
        .then((answer) => {
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: answer.role_id,
                    },
                    {
                        id: answer.employee_id,
                    },
                ],
                (err) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    start();
                }
            );
        });
};

process.on('exit', (err) => {
    connection.end();
});