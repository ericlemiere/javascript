//require points to the packages downloaded for this project
const http = require('http');
const upper = require('upper-case'); 
const events = require('events');

http.createServer((req, res) => {
    res.write(upper.upperCase('Testing uppercase...'));
    res.end();
}).listen(4242);

var emitter = new events.EventEmitter();
myEvent = () => { console.log("Event fired!"); }
emitter.on('fire', myEvent);
emitter.emit('fire');