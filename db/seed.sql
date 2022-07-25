\c students_app;

INSERT INTO students (firstName, lastName, company, skill, pic, city, email) VALUES
('Ingaberg', 'Orton', 'Yadel', 'Oracle')
('Laurens', 'Romanet', 'Skalith', 'Employee Handbooks'),
('Clarke', 'Boards', 'Avamm', 'Sports');

INSERT INTO grades (grade, student_id) VALUES
(78, 1),
(100, 1),
(75, 2),
(89, 2),
(88, 3);

-- psql -U postgres 