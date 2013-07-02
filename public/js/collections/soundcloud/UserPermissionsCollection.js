define( function ( require ) {
	'use strict';

	var Backbone             = require( 'backbone' );
	var Marionette           = require( 'marionette' );
	var _                    = require( 'underscore' );
	var UserPermissionsModel = require( 'GroupModels/UserPermissionsModel' );

	return Backbone.Collection.extend( {

		'model' : UserPermissionsModel,

		'initialize' : function ( models, options ) {
			if ( options ) {
				this.groupId = options.groupId;
				this._id = options._id;
			}
		},

		'url' : function () {
			return '/groups/' + this.groupId + '/users/' + this._id + '/permissions';
		},

		'navbarPermissions' : function () {
			return _.without( _.uniq( _.flatten( _.map( this.toJSON(), function ( list ) {
				if ( _.contains( list.tags, 'settings' ) || _.contains( list.tags, 'communities' ) ) {
					return list.tags;
				}

			} ) ) ), 'settings', undefined );
		},

		'settingsPermissions' : function () {
			return _.without( _.uniq( _.flatten( _.map( this.toJSON(), function ( list ) {

				if ( _.contains( list.tags, 'settings' ) ) {
					return list.tags;
				}

			} ) ) ), 'settings', undefined );
		},

		'membershipPermissions' : function () {
			return _.without( _.uniq( _.flatten( _.map( this.toJSON(), function ( list ) {

				if ( _.contains( list.tags, 'membership' ) && ( _.contains( list.tags, 'users' ) || _.contains( list.tags, 'requestedUsers' ) || _.contains( list.tags, 'invitedUsers' ) ) ) {
					return { 'method' : list.method, 'description' : list.description, 'route' : list.route };
				}

			} ) ) ), undefined );
		}

	} );
} );
