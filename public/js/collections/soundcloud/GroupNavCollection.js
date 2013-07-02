define( function ( require ) {
	'use strict';

	var Backbone      = require( 'backbone' );
	var GroupNavModel = require( 'GroupModels/GroupNavModel' );

	return Backbone.Collection.extend( {
		'model' : GroupNavModel
	} );

} );