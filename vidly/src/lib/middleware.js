const joi = require('joi');

function validator(jsonBody, structure) {
    let schema = joi.object(structure)
    let result = schema.validate(jsonBody);
    return result;
}

function logger(req, res) {
    console.log(`${req.rid} || ${req.url} || ${new Date().toUTCString()} ... Initiating request ...`);
    
}

module.exports = { validator, logger };