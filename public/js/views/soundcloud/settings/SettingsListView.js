define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var SettingsItemView = require( 'GroupViews/settings/SettingsItemView' );

	var SettingsNavCollection = require( 'GroupCollections/SettingsNavCollection' );

	return Marionette.CollectionView.extend( {

		'template'  : _.template( '' ),
		'itemView'  : SettingsItemView,
		'tagName'   : 'ul',
		'className' : 'settings-nav',

		'initialize' : function ( options ) {

			var permissions = options.permissions.settingsPermissions();
			this.collection = new SettingsNavCollection( null, { 'groupId' : options.groupId } );

			var navigation = {

				'details' : new Backbone.Model( {
					'route'       : '#',
					'method'      : 'Details',
					'description' : 'Edit the group banner, motto and other details.'
				} ),

				'licensing' : new Backbone.Model( {
					'route'       : '#',
					'method'      : 'Licensing',
					'description' : 'Modify license assignments within your group.'
				} ),

				'membership' : new Backbone.Model( {
					'route'       : '#',
					'method'      : 'Membership',
					'description' : 'Approve requests to join your group, or remove group members.'
				} ),

				'priviledges' : new Backbone.Model( {
					'route'       : '#',
					'method'      : 'Privileges',
					'description' : 'Control the roles of members in your group.'
				} ),

				'reports' : new Backbone.Model( {
					'route'       : '#',
					'method'      : 'Reports',
					'description' : 'Monitor the activity of members in your group.'
				} )

			};

			var self = this;
			_.each( permissions, function( element, index, list ) {
				if ( _.isObject( navigation[element] ) ) {
					self.collection.add( navigation[element] );
				}
			} );

			return this;
		}
	} );
} );