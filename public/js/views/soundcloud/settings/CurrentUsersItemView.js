 define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var owner_tmpl = require( 'text!templates/groups/settings/groupCurrentUsersOwnerItem.html' );
	var user_tmpl  = require( 'text!templates/groups/settings/groupCurrentUsersItem.html' );

	return Marionette.ItemView.extend( {
		'template'      : _.template( '' ),
		'ownerTemplate' : _.template( owner_tmpl ),
		'userTemplate'  : _.template( user_tmpl ),
		'tagName'       : 'li',
		'className'     : 'user-list-item',

		'events'	: {
			'click #group-delete-user-button'   : 'deleteUserActions',
			'click #group-delete-user-cancel'   : 'deleteUserActions',
			'click #group-delete-user-confirm'  : 'deleteUserActions'
		},

		'initialize' : function ( user ) {
			_.bindAll( this );

			this.user = user;

			if ( user.model.get( 'groupowner' ) ) {
				this.usertype = 'owner';
			} else {
				this.usertype = 'user';
			}

			return this;
		},

		deleteUserActions: function ( event ) {

			if ( $( event.currentTarget ).attr( 'id' ) == 'group-delete-user-button' ) {

				$( event.currentTarget ).hide();
				$( event.currentTarget ).closest( '#group-delete-user-container' ).find( '#group-delete-user-content' ).show();

			} else if ( $( event.currentTarget ).attr( 'id' ) == 'group-delete-user-cancel' ) {

				$( event.currentTarget ).closest( '#group-delete-user-container' ).find( '#group-delete-user-button' ).show();
				$( event.currentTarget ).closest( '#group-delete-user-container' ).find( '#group-delete-user-content' ).hide();

			} else if ( $( event.currentTarget ).attr( 'id' ) == 'group-delete-user-confirm' ) {

				Vent.trigger( 'GroupUsers:delete', { 'user' : this.user } );
			}

			return this;
		},

		getTemplate: function () {

			if ( this.usertype === 'owner' ) {
				return this.ownerTemplate;
			} else if ( this.usertype === 'user' ) {
				return this.userTemplate;
			}

			return this;
		}
	} );

} );