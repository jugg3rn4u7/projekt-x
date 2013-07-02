 define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );

	var template   = require( 'text!templates/groups/settings/groupSettingsItem.html' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName'   : 'li',

		'events' : {
			'click' : 'showSetting'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			return this;
		},

		'showSetting' : function () {
			Backbone.history.navigate( 'groups/' + this.model.collection.groupId + '/settings/membership', true );
			return this;
		}
	} );

} );