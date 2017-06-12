var io = require('socket.io-client');
var broadcaster =  io.connect('http://0.0.0.0:3001');

broadcaster.on('message', function(msg){
	console.log('received new message: ' + msg.text);
});