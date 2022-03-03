
const Logger = require('./logger');
const logger = new Logger();
const http = require('http');


// Raise event
// emitter.emit('MessageLogged', {id: 1, url: "https://google.com"});

// Raise : logging data:message
// emitter.on('logging', (data) => {
//     console.log(data);
// });
// emitter.emit('logging', {'msg': 'Successful'})


// Register a listener
logger.on('MessageLogged', (args) =>{
    console.log('Listener called!', args);
})
logger.log('Logger called')


// HTTP
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/events') {
        res.write(JSON.stringify({ev1: 'Afrochella', ev2: 'Polo Beach Club'}));
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('New connection');
});

server.listen(3000);

