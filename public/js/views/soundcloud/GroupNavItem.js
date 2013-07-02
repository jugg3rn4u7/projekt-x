 define( function ( require ) {

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!templates/groups/groupNavItem.html' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName'   : 'li'
	} );

} );