const express = require('express');
const controller = express.Router();

const studentData = require('../studentData.json');

// get all students
controller.get('/', (request, response)=>{
    // response.send("Hello from the students controller!");
    // response.json({hello: "world"});

    // how do I handle a query string?
    let {limit=25, min, max} = request.query; // '10'

    limit = Number(limit); // 10

    console.log(limit);

    // how do I change the student data according to the limit?
    // studentData.students = [ 25 items ]
    // studentData.students = studentData.students.slice(0, limit)

    let studentDataForDelivery = {...studentData}; // copy data object
    studentDataForDelivery.students = studentDataForDelivery.students.slice(0, limit) // slice it with our limit

    response.json(studentDataForDelivery);


    // SELECT * FROM students
    if(!min && !max){
        // SELECT * FROM students LIMIT $1, [limit]

    } else {
        // SELECT * FROM students WHERE id >= $1 AND id <= $2 LIMIT $3, [min, max, limit]

    }


})


// get students by their specific id
controller.get('/:id', (request, response)=>{
    try {
        const studentId = request.params.id;

        if (!/[0-9]/.test(studentId)){
            response.send('Student id must be a number.')
            return;
        }

        const singleStudent = studentData.students.find(student => {
            return student.id === studentId;
        });

        console.log(singleStudent);
        if (singleStudent){
            response.json(singleStudent);
        } else {
            response.send('Student not found');
        }
    } catch (err){
        response.status(500).send('An error occurred');
    }
})

module.exports = controller;