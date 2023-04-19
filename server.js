const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');

db.connect((err) => {
    if (err) throw err;
    console.log('connected to the db');
});

function questions() {
    inquirer.prompt({
        type: 'list',
        name: 'questions',
        message: 'What would you like to do?',
        choices: [
            'View all Departments',
            'View all roles',
            'View all Employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'View employees by department',
            'Exit',
        ],
    })
    .then(function (response) {
        if (response.questions === 'View all Employees') {
            getEmployee();
        }
        else if (response.questions === 'view All Departments') {
            getDepartment();
        }
        else if (response.questions === 'View all roles') {
            getRoles();
        }
        else if (response.questions === 'Add a department') {
            addDepartment();
        }
        else if (response.questions === 'Add a role') {
            addRole();
        }
        else if (response.questions === 'Add an employee') {
            addEmployee();
        }
        else if (response.questions === 'Update an employee role') {
            updateEmployee();
        }
        else if (response.questions === 'View employees by department') {
            viewEmployeesByDept();
        }
        else if (response.questions === 'Exit') {
            return;
        }
    });
}

function getEmployee() {
    const sql = ` SELECT employee.first_name, employee.last_name,  roles.title,
    roles.salary, department.dept_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee LEFT JOIN roles on employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
}

function getDepartment() {
    const sql = `SELECT * FROM department;`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
}

function getRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department you would like to add?',
        },
    ])
  .then(function (inform) {
    const depart = inform.departmentName;
    const sql = `INSERT INTO department (dept_name) VALUES ('${depart}')`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
  });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'titleName',
            message: 'What is the title of the role you would like to add?',
        },
        {
            type: 'input',
            name:'salary',
            message: 'What is the salary of the role you would like to add?',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department id of the role you would like to add?',
        },
    ])
  .then(function (info) {
    const roleTn = info.titleName;
    const roleSa = info.salary;
    const roleDp = info.departmentId;
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleTn}', '${roleSa}', '${roleDp}')`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
  });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role id of the employee you would like to add?',
        },
        {
            type: 'input',
            name:'managerId',
            message: 'What is the manager id of the employee you would like to add?',
        },
    ])
 .then(function (info) {
    const firstName = info.firstName;
    const lastName = info.lastName;
    const roleId = info.roleId;
    const managerId = info.managerId;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}')`;
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
 });
}

function updateEmployee() {
    
}

function viewEmployeesByDept() {
    const sql = `SELECT department.dept_name, employee.first_name, employee.last_name
  FROM employee LEFT JOIN roles on employee.role_id = roles.id
  LEFT JOIN department ON roles.department_id = department.id;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  }); 
}

questions ();