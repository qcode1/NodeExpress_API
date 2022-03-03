const genresRouter = require('express').Router();
const { validator } = require('../lib/middleware');
const joi = require('joi');
var _ = require('lodash');


var genres = [
    {
        "id": 1,
        "name": "Action"
    },
    {
        "id": 2,
        "name": "Thriller"
    },
    {
        "id": 3,
        "name": "Horror"
    },
    {
        "id": 4,
        "name": "Romance"
    },
    {
        "id": 5,
        "name": "Adventure"
    },
    {
        "id": 6,
        "name": "Kids"
    },
    {
        "id": 7,
        "name": "Drama"
    }
]

var structure = {
    name: joi.string()
}

genresRouter.get(`/`, (req, res) => {
    return res.send( {msg: "Successful", data: genres} );
});

genresRouter.get(`/:id`, (req, res) => {

    var genre_id = req.params.id

    var found = genres.find(g => g.id === parseInt(genre_id));

    if (!found) return res.status(404).json( {msg: `Genre with ID: ${genre_id} not found`} )

    return res.status(200).send( {msg: "Successful", data: [found]} );
});

genresRouter.post(`/`, (req, res) => {
    var result = validator(req.body, structure);
    console.log(result);
    if (_.isEmpty(req.body)) return res.json( {msg: "Failed - Request body empty"} )
    
    if (result.error) return res.json( {msg: "Failed", data:[result.error.details[0].message]} );
    var genreId = genres.length+1;
    var genreObj = {
        id: genreId,
        name: req.body.name
    }

    genres.push(genreObj)
    return res.status(200).json( {msg: "Successful", data: genres} );
});

genresRouter.put('/:id', (req, res) => {

    var genre_id = req.params.id;
    console.log(req.query);
    console.log(genre_id);

    var found = genres.find(g => g.id === parseInt(genre_id))

    if (!found) return res.json( {msg: `Genre with ID: ${genre_id} not found`} );

    if (_.isEmpty(req.body)) return res.json( {msg: "Failed - Request body empty"} )

    var result = validator(req.body, structure)
    if (result.error) return res.json( {msg: "Failed", data:[result.error.details[0].message]} );
    found.name = req.body.name
    res.status(200).json( {msg: "Successful", data: genres} )

});


genresRouter.delete('/:id', (req, res) => {
    var genre_id = req.params.id;

    var found = genres.find(g => g.id === parseInt(genre_id))
    console.log(found);

    if (!found) return res.status(404).json( {msg: `Genre with ID: ${genre_id} does not exist!`} )

    const index = genres.indexOf(found)
    genres.splice(index, 1)

    res.json( {msg: "Successful", date: genres} );

})

module.exports = genresRouter;

