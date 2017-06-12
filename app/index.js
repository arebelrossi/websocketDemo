var listener = require('socket.io').listen(3000);
var broadcaster = require('socket.io').listen(3001);
var io = require('socket.io-client');

listener.sockets.on('connection', function(lisn){
	var messageQueue =  io.connect('http://0.0.0.0:3001');
	console.log('connectes to broadcaster service');
	lisn.on('message', function(msg){
		messageQueue.emit('message queue', msg);
		console.log('message added to queue');
	});
});


broadcaster.sockets.on('connection', function(brdcst){
	brdcst.on('message queue', function(msg){
		broadcaster.emit('message', msg);
		console.log('broadcasting message: ' + msg.text);
	})
});