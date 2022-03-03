const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.render('index', {title: "My Vidly Express App", message: "Hello, this is just the beginning!"})
});

module.exports = homeRouter;