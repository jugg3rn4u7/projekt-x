define(function ( require ) {

	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var async      = require( 'async' );

	var SoundCloudModel = require( 'SoundCloudModels/SoundCloudModel' );

	var SoundCloudController = Marionette.Controller.extend( {

		'initialize' : function( options ){
			_.bindAll( this );
			
		},

		'isAuthenticated' : function () {
			
		},

		'showMyAccnt' : function () {

		},

		'showMyTracks' : function () {

		},

		'showAllTracks' : function () {

			var Track  = SoundCloudModel.extend({ urlRoot : this.urlRoot + '/:clientId/tracks' });
			var tracks = new Track();
alert('asd');
			tracks.fetch( { 
				success: function ( model, response ) {
					console.log("model : ", model);
				},

				error: function ( error, response ) {
					console.log("error : ", error);
				}  
			} ); 
		},

		'showMyFollowers' : function () {

		},

		'showDefault' : function () {

		}

	} );

	return new SoundCloudController();

} );