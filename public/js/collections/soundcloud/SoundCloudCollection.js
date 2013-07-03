define( function ( require ) {
	'use strict';

	var Backbone      	= require( 'backbone' );
	var SoundCloudModel = require( 'SoundCloudModels/SoundCloudModel' );

	return Backbone.Collection.extend( {
		'model' : SoundCloudModel
	} );

} );