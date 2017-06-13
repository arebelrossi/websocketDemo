const io = require('socket.io-client');
const broadcaster =  io.connect('http://0.0.0.0:3001');

broadcaster.on('message', function(msg){
	console.log(`received new message: ${msg.text}`);
});