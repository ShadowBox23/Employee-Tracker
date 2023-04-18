const inquirer = require('inquirer');
const db = require('./config/connection');

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
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    })
    .then(function (response) {
        if (response.questions === 'View all departments') {
            getEmp();
        }
        else if (response.questions === 'view All Departments') {
            getDept();
        }
        else if (response.questions === 'View all roles') {
            getRoles();
        }
        else if (response.questions === 'Add a department') {
            addDept();
        }
        else if (response.questions === 'Add a role') {
            addRole();
        }
        else if (response.questions === 'Add an employee') {
            addEmp();
        }
        else if (response.questions === 'Update an employee role') {
            updateEmp();
        }
        else if (response.questions === 'Exit') {
            return;
        }
    });
}



questions();