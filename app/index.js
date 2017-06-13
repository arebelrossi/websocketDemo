const listener = require('socket.io').listen(3000);
const broadcaster = require('socket.io').listen(3001);
const io = require('socket.io-client');

listener.sockets.on('connection', lisn => {
	const messageQueue =  io.connect('http://0.0.0.0:3001');
	console.log('connects to broadcaster service');
	lisn.on('message', msg => {
		messageQueue.emit('message queue', msg);
		console.log(`new message received and added to queue: ${msg.text}`);
	});
});


broadcaster.sockets.on('connection', brdcst => {
	brdcst.on('message queue', msg => {
		broadcaster.emit('message', msg);
		console.log(`broadcasting message: ${msg.text}`);
	})
});