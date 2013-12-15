'use strict';

//
var expect = require('expect.js');
var mario = require('../mario-mario');

// mocks
mario.server = {};
mario.server.io = {};
mario.server.io.routes = [];
mario.server.io.route = function (route,handler) {
	this.routes.push({route:route,handler:handler});
};
mario.server.gets = [];
mario.server.get = function (route,handler) {
	this.gets.push({route:route,handler:handler});
};
mario.server.posts = [];
mario.server.post = function (route,handler) {
	this.posts.push({route:route,handler:handler});
};

//
describe('mario-mario',function(){

	//
	beforeEach(function(){
		mario.server.io.routes = [];
		mario.server.gets = [];
		mario.server.posts = [];
	});

	//
	it('should exist',function(){
		expect(mario).to.be.ok()
	});

	//
	it('should parseIos',function(){
		mario.parseIos({
			'unicast:echo' : function (q) {
				return q.io.emit('unicast:echo','unicast:echo');
			},
			'broadcast:echo' : function (q) {
				return q.io.broadcast('broadcast:echo','broadcast:echo');
			}
		});
		expect(mario.server.io.routes.length == 2).to.be.ok();
	});

	//
	it('should parseGets',function(){
		mario.parseGets({
			'/' : function (q,r) {
				return r.send({
					echo : 'GET /'
				});
			},
			'/echo' : function (q,r) {
				return r.send({
					echo : 'GET /echo'
				});
			}
		});
		expect(mario.server.gets.length == 2).to.be.ok();
	});

	//
	it('should parsePosts',function(){
		mario.parsePosts({
			'/' : function (q,r) {
				return r.send({
					echo : 'POST /'
				});
			},
			'/echo' : function (q,r) {
				return r.send({
					echo : 'POST /echo'
				});
			}
		});
		expect(mario.server.posts.length == 2).to.be.ok();
	});

	//
	it('should parseRoutes',function(){
		mario.parseRoutes({
			http: {
				get: {
					'/' : function (q,r) {
						return r.send('<!doctype html><html><script src=\'socket.io/socket.io.js\'></script></html>');
					},
					'/echo' : function (q,r) {
						return r.send({
							echo : 'GET /echo'
						});
					}
				},
				post: {
					'/' : function (q,r) {
						return r.send({
							echo : 'POST /'
						});
					},
					'/echo' : function (q,r) {
						return r.send({
							echo : 'POST /echo'
						});
					}
				}
			},
			socket: {
				'unicast:echo' : function (q) {
					return q.io.emit('unicast:echo','unicast:echo');
				},
				'broadcast:echo' : function (q) {
					return q.io.broadcast('broadcast:echo','broadcast:echo');
				}
			}
		});
		var i = (mario.server.io.routes.length == 2);
		var j = (mario.server.gets.length == 2);
		var k = (mario.server.posts.length == 2);
		expect(i&&j&&k).to.be.ok();
	});

});



















