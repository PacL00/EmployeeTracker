INSERT INTO departments (department)
VALUES ('Engineering'), 
('Sales'), 
('Finance'), 
('Legal'),
('marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Engineer', 100000, 1),
('Software Engineer', 80000, 1),
('Sales Lead', 80000, 2),
('Salesperson', 50000, 2),
('Accountant', 70000, 3),
('Legal Team Lead', 80000, 4),
('Lawyer', 70000, 4),
('Marketing Lead', 70000, 5),
('Marketing Team Member', 50000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 5, 3),
('Malia', 'Brown', 6, NULL),
('Sarah', 'Lourd', 7, 6),
('Tom', 'Allen', 8, 6);