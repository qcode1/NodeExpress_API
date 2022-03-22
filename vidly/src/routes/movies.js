const moviesRouter = require('express').Router();
const { Movie } = require("../models/movie")
const { validator } = require('../lib/middleware');
const joi = require('joi');
var _ = require('lodash');

var structure = {
    name: joi.string(),
    actors: joi.array(),
    genre: joi.array(),
    profit: joi.number(),
    isReleased: joi.boolean(),
    date: joi.date()
}

moviesRouter.get(`/`, async (req, res) => {
    let result = await Movie.find().sort('name');
    return res.json( {msg: "Successful", data: result} );
});

moviesRouter.get(`/:id`, async (req, res) => {

    var movie_id = req.params.id;
    var found = '';

    try {
        found = await Movie.find({_id: movie_id});
    } catch(err) {
        return res.status(404).json({msg: `An error occured while fetching Movie with ${movie_id} `, data: err.message})
    }

    if (!found) return res.status(404).json( {msg: `Movie with ID: ${movie_id} not found`} )

    return res.status(200).json( {msg: "Successful", data: found} );
});

moviesRouter.post(`/`, async (req, res) => {

    var result = '';
    var movieName = '';

    try {
        result = validator(req.body, structure);
        movieName = req.body.name.toUpperCase()
    }catch(err) {
        return res.status(400).json({msg: "Failed", data: `An error occured while reading name property :: ${err.message}`})
    }

    if (_.isEmpty(req.body)) return res.json( {msg: "Failed - Request body empty"} )
    
    if (result.error) return res.json( {msg: "Failed", data:[result.error.details[0].message]} );

    try {
        result = await Movie.find({name: movieName}).count();
        if (result > 0) return res.status(409).json({msg: "Failed", data: "Record already exists"})
        
        let movie = new Movie(req.body)
        result = await movie.save();
    } catch(err) {
        return res.json({msg: `An error occured while saving Movie with ${req.body} `, data: err.message})
    }
    
    return res.status(201).json( {msg: "Successful", data: result} );
});

moviesRouter.put('/:id', async (req, res) => {

    var result = '';
    var movie_id = req.params.id;

    if (_.isEmpty(req.body)) return res.status(400).json( {msg: "Failed - Request body empty"} )
    
    try {
        result = validator(req.body, structure)
        if (result.error) return res.status(400).json( {msg: "Failed", data:[result.error.details[0].message]} );
    } catch(err) {
        return res.status(400).json({msg: "Failed", data: `An error occured while validating update request :: ${err.message}`})
    }

    try{
        var movie = await Movie.findByIdAndUpdate(movie_id, req.body, { new: true })
        res.status(200).json( {msg: "Update Successful", data: movie} )
    }catch (err) {
        return res.json({msg: "Failed", data: `An error occured while updating :: ${err.message}`})
    }
});


moviesRouter.delete('/:id', async (req, res) => {

    var movie_id = req.params.id;
    var found = '';

    try {
        found = await Movie.findByIdAndRemove({_id: movie_id});
        if (_.isEmpty(found)) return res.status(404).json({msg: "Failed", data: `Movie with ID: ${movie_id} does not exist`})
        res.status(200).json( {msg: "Successful", date: found});
    } catch(err) {
        return res.status(400).json({msg:"Failed", data: `An error occured while deleting Movie with ${movie_id} ::: ${err.message}`})
    }

});

module.exports = moviesRouter;

