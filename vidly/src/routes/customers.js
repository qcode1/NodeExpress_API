const express = require("express");
const customersRouter = express.Router();
const { validator } = require('../lib/middleware');
const joi = require('joi');
var _ = require('lodash');
const Customer  = require("../models/customer");

var structure = {
    isGold: joi.boolean().required(),
    name: joi.string().min(5).max(150).required(),
    phone: joi.number().min(12).max(12).required()
}

customersRouter.get("/", async(req, res) => {
    let customers = await Customer.find();
    return res.status(200).json({msg: "Successful", data: customers})
});

customersRouter.get(`/:id`, async (req, res) => {

    var customer_id = req.params.id;
    var found = '';

    try {
        found = await Customer.find({_id: customer_id});
    } catch(err) {
        return res.status(404).json({msg: `An error occured while fetching Customer with ${customer_id} `, data: err.message})
    }

    if (!found) return res.status(404).json( {msg: `Customer with ID: ${customer_id} not found`} )

    return res.status(200).json( {msg: "Successful", data: found} );
});

customersRouter.post(`/`, async (req, res) => {

    var result = '';
    var customerName = '';

    try {
        result = validator(req.body, structure);
        customerName = req.body.name.toUpperCase()
    }catch(err) {
        return res.status(400).json({msg: "Failed", data: `An error occured while reading name property :: ${err.message}`})
    }

    if (_.isEmpty(req.body)) return res.json( {msg: "Failed - Request body empty"} )
    
    if (result.error) return res.json( {msg: "Failed", data:[result.error.details[0].message]} );

    try {
        result = await Customer.find({name: customerName}).count();
        if (result > 0) return res.status(409).json({msg: "Failed", data: "Record already exists"});

        req.body.name = req.body.name.toUpperCase();
        
        let customer = new Customer(req.body)
        result = await customer.save();
    } catch(err) {
        return res.json({msg: `An error occured while saving Customer with ${req.body} `, data: err.message})
    }
    
    return res.status(201).json( {msg: "Successful", data: result} );
});

customersRouter.put('/:id', async (req, res) => {

    var result = '';
    var customer_id = req.params.id;

    if (_.isEmpty(req.body)) return res.status(400).json( {msg: "Failed - Request body empty"} )
    
    try {
        result = validator(req.body, structure)
        if (result.error) return res.status(400).json( {msg: "Failed", data:[result.error.details[0].message]} );
    } catch(err) {
        return res.status(400).json({msg: "Failed", data: `An error occured while validating update request :: ${err.message}`})
    }

    try{
        var customer = await Customer.findByIdAndUpdate(customer_id, req.body, { new: true })
        res.status(200).json( {msg: "Update Successful", data: customer} )
    }catch (err) {
        return res.json({msg: "Failed", data: `An error occured while updating :: ${err.message}`})
    }
});

customersRouter.delete('/:id', async (req, res) => {

    var customer_id = req.params.id;
    var found = '';

    try {
        found = await Movie.findByIdAndRemove({_id: customer_id});
        if (_.isEmpty(found)) return res.status(404).json({msg: "Failed", data: `Customer with ID: ${customer_id} does not exist`})
        res.status(200).json( {msg: "Successful", date: found});
    } catch(err) {
        return res.status(400).json({msg:"Failed", data: `An error occured while deleting Customer with ${customer_id} ::: ${err.message}`})
    }

});



module.exports = customersRouter;
