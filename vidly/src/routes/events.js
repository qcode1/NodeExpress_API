const express = require('express');
const joi = require('joi');
const { validator } = require('../lib/middleware');
const eventsRouter = express.Router();

const events = [
    { "id": 1, "name": "Afrochella" },
    { "id": 2, "name": "Polo Beach Club" },
    { "id": 3, "name": "Bloom Day Party" },
    { "id": 4, "name": "Twist" },
    { "id": 5, "name": "Sunday y3 Sandbox" }
];

var structure = {
    name: joi.string()
}

// Get request
eventsRouter.get('/', (req, res) => {
    res.json( {msg: "Successful", data: events} )
});

// Get request - one
eventsRouter.get('/:id', (req, res) => {
    var event_id = req.params.id
    let result = events.find(e => e.id === parseInt(event_id));

    if (!result) return res.status(404); res.send({msg: "The event does not exist"});
    
    return res.send({msg: "Successful", data: [result]});
})

// Get request
eventsRouter.get('/:id/:year', (req, res) => {
    res.send([req.params, req.query])
});

// Post request
eventsRouter.post('/', (req, res) => {
    let {error} = validator(req.body, structure);

    event_id = events.length+1;
    event_name = req.body.name;
    event_obj = {id: event_id, name: event_name};

    if (error) return res.status(400).send({error: error.details[0].message});
    
    return events.push(event_obj); res.status(200).send({msg: "Success", data:events});
});

// Put request
eventsRouter.put('/:id', (req, res) => {
    
    var event_id = req.params.id
    let result = events.find(e => e.id === parseInt(event_id));
    
    console.log(result);
    let {error} = validator(req.body, structure);
    
    if (!result) return res.status(404).send({msg: "Event not found!"});
    
    if (error) return res.status(400).send({error: error.details[0].message});

    result.name = req.body.name; 
    return res.status(200).send({msg: "Successful", data: events});

});

// Delete request 
eventsRouter.delete('/', (req, res) => {
    console.log(req.body);

    var event_id = req.body.id;
    let result = events.find(e => e.id === parseInt(event_id));

    if (!result) return res.status(404).send({msg: "Event not found!"});
    
    index = events.indexOf(result);
    events.splice(index, 1)
    return res.status(200).send({ msg: "Successful", data: events })

});


module.exports = eventsRouter;