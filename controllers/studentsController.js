const express = require('express');
const controller = express.Router();

const studentData = require('../studentData.json');

const db = require('../db/index');
const { response } = require('express');

controller.get('/', async (request, response) => {

    let {limit=25, min, max} = request.query; 

    limit = Number(limit);
    
    let studentDataForDelivery = await db.any('SELECT * FROM students');
    
    studentDataForDelivery = studentDataForDelivery.slice(0, limit);

    response.json(studentDataForDelivery);

});


// write a route to get a student by their full name

// implement min and max ids for get students

// write a route to get the grade average of a student by their id

// get all students sorted by their last name


// write a route that accepts a student id as part of the path
// returning an object (JSON), representing the student with that id

// get students by their specific id
controller.get('/:id', async (request, response) => {
    try {
        const studentId = request.params.id;
        
        if(!/[0-9]/.test(studentId)){
            response.send('Student id must be a number.')
            return;
        }
        
        const singleStudent = await db.oneOrNone('SELECT * FROM students WHERE id = $1', [studentId]);
        
        if(singleStudent){
            response.json(singleStudent);
        } else {
            response.send('Student not found');
        }  
          
    } catch (err){
        response.status(500).send("An error occurred");
    }
})

// route for finding the grades of a specific student
// sort the grades (oldest to newest)
controller.get('/:id/grades', async (req, res) => {

    try {  
        const studentId = req.params.id;

        const grades = await db.any('SELECT * FROM grades WHERE student_id = $1', [studentId]);

        grades.sort((a, b) => a.date - b.date);

        res.json(grades);
        
    } catch (err){
        res.status(500).send(err);
    }
});

// UPDATE
controller.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const {firstname, lastname, company, city, skill, pic} = req.body;
        
        // console.log(req.body)
        // console.log(firstname)

        const updatedUser = await db.one('UPDATE students SET firstname=$1, lastname=$2, company=$3, city=$4, skill=$5, pic=$6 WHERE id=$7 RETURNING *', [firstname, lastname, company, city, skill, pic, studentId]
        );

        res.json(updatedUser)

    } catch (err){
        res.status(500).send(err);
    }
})

controller.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        await db.none('DELETE FROM grades WHERE student_id = $1', [studentId]);

        const deletedStudent = await db.one('DELETE FROM students WHERE id = $1 RETURNING *', [studentId]);

        res.json(deletedStudent);

    } catch (err){
        res.status(500).send(err);
    }
})

// Jose - UPDATE ROUTE
// controller.put('/:id', async (req, res) => {
//     console.log('Update route is up and running')

//     try {
//         // the id helps db to know which students to update and body is the new info to be used
//         const studentId = req.params.id;
//         const newInfo = req.body;
    
//         // const updatedStudent = await db.one('SELECT * FROM students WHERE id = $1', [studentId]); // <= Just testing if it works
//         const updatedStudent = await db.one('UPDATE students SET firstName=$1, lastName=$2, company=$3, skill=$4, pic=$5, city=$6, email=$7 WHERE id=$8 RETURNING *', [studentId, newInfo]);

//         res.status(200).json({success: true, payload: updatedStudent});
//     } catch (err) {
//         res.status(500).send(err);
//     }
// })

module.exports = controller;