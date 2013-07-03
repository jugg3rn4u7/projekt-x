module.exports = function () {

	// Global variables. `_paths` is used for reference of files
	// in the application. `_config` holds configuration parameters.
	_paths  = require( './config/paths' );
	_config = require( './config/config' );

	// Load modules for cluster and get the number of CPUs
	var os           = require( 'os' );
	var util         = require( 'util' );
	var cluster      = require( 'cluster' );
	var numberOfCPUs = os.cpus().length;

	cluster.on( 'online', function ( worker ) {
		util.log( 'worker ' + worker.id + ' online ' + '(' + worker.process.pid + ')' );
	} );

	if ( cluster.isMaster ) {

		// Fork workers
		for ( var i = 0; i < numberOfCPUs; i++ ) {
			cluster.fork();
		}

		cluster.fork( 'exit', function ( worker, code, signal ) {
			util.log( 'worker' + worker.process.pid + ' died' );
		} );

	} else {

		// Load modules
		var path     = require( 'path' );
		var fs       = require( 'fs' );
		var http     = require( 'http' );
		var express  = require( 'express' );
		var socket   = require( 'socket.io' );
		var mongoose = require( 'mongoose' );
		var passport = require( 'passport' );
		var app      = express();
		var server   = http.createServer( app );

		app.disable( 'x-powered-by' );

		// Express connection
		server.listen( _config.rest.port, function () {
			util.log( 'Server running at ' + _config.rest.protocol + _config.rest.host + ':' + _config.rest.port );
		} );

		require( _paths( 'app.controllers.public.PublicController' ) )( app );

		// SoundCloud B/E controller
		require( _paths( 'app.controllers.soundcloud.SoundCloudController' ) )( app );
		
	}

};