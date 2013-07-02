 define( function ( require ) {

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require(  'text!templates/groups/groupLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),
		'tagName' : 'div',

		'regions' : {
			'header'           : '#group-header',
			'nav'              : '#group-navigation',
			'membershipStatus' : '.membership-status',
			'content'          : '#group-content'
		}


	} );

} );