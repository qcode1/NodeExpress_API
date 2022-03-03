const express = require('express');
const coursesRouter = express.Router();
const { validator } = require('../lib/middleware');
const joi = require('joi');
const _ = require('lodash')

var courses = ["Physics", "Biology", "History", "Maths", "Computer Science", "Technical Drawing"]

var structure = {
    name: joi.string()
}

// GET COURSES
coursesRouter.get('/', (req, res) => {
    res.json( {msg: "Successful", data: courses} );
});

// GET ONE COURSE ID
coursesRouter.get('/:id', (req, res) => {

    var course_id = req.params.id;
    if (course_id >= courses.length) return res.status(404).json( {msg: `Course with ID: ${course_id} does not exist!`} )

    return res.json( {msg: "Successful", data: courses[course_id]} ); 
})

coursesRouter.post('/', (req, res) => {

    if (_.isEmpty(req.body)) return res.json( {msg: "Request body empty"} )

    var result = validator(req.body, structure)

    if (result.error) return res.json( {msg: result.error.details[0].message} )

    courses.push(req.body.name)
    res.json( {msg: "Successful", data: courses} )

});

module.exports = coursesRouter;