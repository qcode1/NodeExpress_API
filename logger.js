const EventEmitter = require('events');
const emitter = new EventEmitter();

// Logger Class initialization
class Logger extends EventEmitter {

    // log method
    log = (message) => {
        // Send HTTP request
        console.log(`Success `+ message);
    
        this.emit('MessageLogged', {id: 233, msg: `${message} successfully`});
    }

    // logError method
    logError = (message) => {
        // Send HTTP request
        console.log(`Error `+ message);
    }

}




module.exports = Logger;
// console.log(module);


