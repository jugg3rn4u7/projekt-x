define( function ( require ) {
	'use strict';

	var _          = require('underscore');
	var $          = require('jquery');
	var Marionette = require('marionette');
	var tmpl       = require('text!templates/groups/settings/groupRequestedUsersItem.html');
	var actionTmpl = require('text!templates/users/notifications/notificationsActionItemView.html');


	return Marionette.ItemView.extend( {
		'template'       : _.template( tmpl ),
		'actionTemplate' : _.template( actionTmpl ),
		'tagName'        : 'li',
		'className'      : 'user-list-item',

		'initialize' : function( ) {
			_.bindAll( this );
			return this;
		},

		'events' : {
			'click .action' : 'callAction'
		},

		'templateHelpers' : function ( ) {
			return { 'actionMessage' : this.actionMessage };
		},

		'callAction' : function ( event ) {
			var self = this;

			var actionId = $( event.currentTarget ).data( 'action-id' );
			var action = _.findWhere( this.model.get( 'receiverActions' ), { '_id' : actionId } );
			this.actionMessage = action.message;

			if ( action.method === 'NAVIGATE' ) {
				//navigate to the page
			} else {
				// do additional testing on the method
				$.ajax( {
					'type'        : action.method,
					'url'         : action.url,
					'dataType'    : 'json',
					'data'        : JSON.stringify( action.body ),
					'contentType' : 'application/json',
					'success'     : this.actionSuccess,
					'error'       : this.actionError
				} );
			}

			return this;
		},

		'actionSuccess' : function ( result ) {
			//clear notification
			this.model.set( 'cleared', true );
			this.model.destroy( { silent: true } );

			this.trigger( 'requestComplete' );

			this.render();

			return this;
		},

		'actionError' : function ( error ) {
			//show standard error message

			this.actionMessage = "Your action could not be completed. Try again later.";

			this.render();

			return this;
		},
		getTemplate: function(){
			if ( this.model.get( 'cleared' ) === true ) {
				return Marionette.getOption( this, 'actionTemplate' );
			} else {
				return Marionette.getOption( this, 'template' );
			}
		}
	} );

} );