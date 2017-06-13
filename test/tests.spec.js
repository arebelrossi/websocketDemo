const should = require('should');
const io = require('socket.io-client');

const listenerService = 'http://0.0.0.0:3000';
const broadcastingService = 'http://0.0.0.0:3001';

const options = {
	transports: ['websocket'],
	'force new connection': true
};

const message = {text: 'Hello World!'};
let messageSender;
let subscriber;

describe('The first service', function(){
	it('Should listen for incoming messages through the websocket protocol', 
		function(done){
		
		messageSender = io.connect(listenerService, options);
		messageSender.on('connect', function(){
			done();
		});
	});
});	

describe('The second service', function(){
	it ("Should publish received messages to subscribers", function(done){
		messageSender = io.connect(listenerService, options);
		subscribers = io.connect(broadcastingService, options);

		messageSender.on('connect', function(){
		
			messageSender.emit('message', message);
			
			subscribers.on('message', function(msg){
				message.text.should.equal(msg.text);
				done();
			});	
		});
	});
});
