const express = require('express');
const controller = express.Router();

const {repeatNTimesWithSpace, capitalizeFirstLetter} = require('../utils/stringUtils');

controller.get('/capitalizeName/:name', (request, response)=>{
    try {
        const name = request.params.name;
        const capitalizedName = capitalizeFirstLetter(name);
        response.send(capitalizedName);
    } catch (err){
        response.send("There was an error");
    }
})


// take in a name and number, and repeat it - using the function that we have
controller.get('/:name/:times', (request, response)=>{
    try {

        // get name
        const name = request.params.name;

        // get times
        const times = request.params.times;

        // get result of `repeatNTimesWithSpace`
        const repeatedNames = repeatNTimesWithSpace(name, times);

        // send string response of result
        response.send(repeatedNames);

    } catch (err){
        response.send("There was an error");
    }
})

module.exports = controller;