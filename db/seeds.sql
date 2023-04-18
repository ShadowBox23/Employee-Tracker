INSERT INTO department (dept_name)
VALUES ('Management'),
    ('Marketing'),
    ('Engineer'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Manager', 67000, 1),
    ('Engineer Manager', 150000, 1),
    ('Sales Manager', 111000, 1),
    ('Senior Staff Engineer', 12200, 3),
    ('Marketing Coordinator', 57000, 2),
    ('Staff Engineer', 90000, 3),
    ('Sales Associate', 45000, 4),
    ('Sales Assistant', 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('William', 'Howard', 2, NULL),
    ('Jimmy', 'Scott', 3, NULL),
    ('Paul', 'Ryan', 4, 1),
    ('James', 'Williams', 5, 2),
    ('Tim', 'Beran', 6, 3),
    ('Skylar', 'Owens', 7, 3),
    ('Eddie', 'Scriven', 8, 2),
    
