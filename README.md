<!-- remember to do both: `git push`, and `git push heroku` -->


# Dependencies

```
npm install pg-promise
```

# Run nodemon
```
 npm run dev
```

# Database

## ElephantSQL
[ElephantSQL](https://www.elephantsql.com/)
 
## Postico
[Postico](https://eggerapps.at/postico/)

to move database to production. (Alternative - use heroku)
Postico - you can only have 5 apps at a time

# heroku
get database into production:
```
 git push heroku
```

to restart application
```
heroku restart
```



Creating a grades table
to link Students with their grades

postico - create a new table `grades`

```
INSERT INTO grades (grade, student_id, date)
VALUES ('87', 1, '2022-07-13'),
('91', 1, '2022-07-12'),
('88', 1, '2022-07-11'),
('89', 1, '2022-07-10'),
('86', 1, '2022-07-09'),
('92', 1, '2022-07-08'),
('100', 1, '2022-07-07'),
('78', 1, '2022-07-06');
```

SELECT * FROM grades ORDER BY (grade) DESC;

SELECT * FROM students WHERE id = 1;
SELECT students.firstname, students.lastname FROM students WHERE id = 1;

```
SELECT students.firstname, students.lastname, grades.grade FROM students
JOIN grades
ON grades.student_id = students.id
WHERE students.id = 1
ORDER BY grades.grade DESC;
```