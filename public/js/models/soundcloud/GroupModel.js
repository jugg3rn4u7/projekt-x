define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );

	return Backbone.Model.extend( {
		'urlRoot'      : '/groups',
		'idAttribute'  : '_id'
	} );

} );