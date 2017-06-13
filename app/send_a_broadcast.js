const instructions = function() {
	if (!!!commandlineInput) {
		console.log("Format: node send_a_broadcast.js message");
		process.exit(1);
	} 
};

const io = require('socket.io-client');
const broadcaster =  io.connect('http://0.0.0.0:3000');
const commandlineInput = process.argv.slice(2).toString() || instructions();
const message = { text: commandlineInput };

broadcaster.on('connect', function(){
	broadcaster.emit('message', message);
	console.log(`sending message: ${message.text}`);
});


