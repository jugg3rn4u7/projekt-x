 define( function ( require ) {

	var _                  = require( 'underscore' );
	var Marionette         = require( 'marionette' );
	var Vent         	   = require( 'Vent' );
	var App    			   = require( 'App' );
	var GroupNavItem       = require( 'views/groups/GroupNavItem' );
	var GroupNavCollection = require( 'collections/groups/GroupNavCollection' );
	var template           = require( 'text!templates/groups/groupNav.html' );

	return Marionette.CollectionView.extend( {

		'template'  : _.template( template ),
		'itemView'  : GroupNavItem,
		'tagName'   : 'ul',
		'className' : 'nav',

		// # Comments
		// Events

		'events' : {
			'click #leave-group' 			: 'removeFromGroup',
			'click #btn-close' 				: 'togglePopup',
			'click #btn-x' 					: 'togglePopup',
			'click #confirm-leave-group' 	: 'deleteUser'
		},

		'initialize' : function ( options ) {

			var self 			= this;
			var permissions 	= this.options.permissions;
			var userId			= this.options.userId;
			var owner			= this.options.owner;

			self.permissions 	= permissions;
			self.userId 		= userId;

			if (userId != owner) {
				permissions.push("leaveGroup");
			}

			this.collection 	= new GroupNavCollection( [
				{
					'label' : 'Home',
					'url' : '#groups/' + this.model.get( '_id' )
				} 
				]);

			var self = this; 

			self.deleteUrl = '/groups/' + this.model.get( '_id' ) + '/users/' + userId;

			var navigation = {
				'resources' 	: {
					'label' 	: 'Resources',
					'url' 		: '#groups/' + this.model.get( '_id' ) + '/resources/'
				},
				'communities' 	: {
					'label' 	: 'Community',
					'url' 		: '#groups/' + this.model.get( '_id' ) + '/resources/' + '502c21e3833ea71307001d56'
				},
				'basic' 		: {
					'label' 	: 'Settings',
					'url' 		: '#groups/' + this.model.get( '_id' ) + '/settings/'
				},
				'leaveGroup' 	: {
					'label' 	: 'Leave Group',
					'url' 		: self.deleteUrl
				}
			};
			
			_.each( permissions, function( element, index, list ) {
				if ( _.isObject( navigation[element] ) ) {
					self.collection.add( navigation[element] );
				}
			} );

			this.options.userId = null;

			return this;
		},

		'togglePopup' : function () {

			$( "#confirm-popup" ).toggle();
		},

		'removeFromGroup' : function ( event ) {

			var self = this;
			var target = event.target;

			if ( $(target).html() === "Leave Group" ) {
				this.togglePopup();	
			}

			event.preventDefault();
			return this;
		},
		'deleteUser' : function ( event ) {

			var self = this;

			event.preventDefault();
			this.togglePopup();

			$.ajax( {
					'type'     : 'DELETE',
					'url'	   : self.deleteUrl,

					'success' : function ( response ) {
					
						Vent.trigger( 'AppController:alert', {
								'msg'  : 'User has been deleted from this group',
								'type' : 'success'
						} );

						Backbone.history.navigate('#users-groups',true);
					},

					'error' : function ( response ) {
						Vent.trigger( 'AppController:alert', {
								'msg'  : 'User deletion from group failed !',
								'type' : 'error'
						} );
					}

				} );

			return this;
		}

	} );

} );