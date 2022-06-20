const express = require('express');
const controller = express.Router();

const studentData = require('../studentData.json');

controller.get('/', (request, response)=>{
    // response.send("Hello from the students controller!");
    // response.json({hello: "world"});
    response.json(studentData);
})

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