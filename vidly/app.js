const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const ruid = require('express-ruid');
const genresRouter = require('./src/routes/genres');
const coursesRouter = require('./src/routes/courses');
const homeRouter = require('./src/routes/home');
const eventsRouter = require('./src/routes/events');

// CONFIGURATION
// console.log(`Application Name       : ${config.get('name')}`);
// console.log(`Mail Server Name       : ${config.get('mail.host')}`);
// console.log(`Mail Server Password   : ${config.get('mail.password')}`);


// TEMPLATING ENGINE
app.set('view engine', 'pug')
app.set('views', './src/templates')

if (app.get('env') === 'development') {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); 
    startupDebugger('Morgan enabled ... ');
}


// DB connection
dbDebugger('Connected to Database ...');


// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('./src/templates'));

// CUSTOM MIDDLEWARE
app.use(ruid());
// app.use(logger);


app.use('/api/genres', genresRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/events', eventsRouter);
app.use('/', homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
