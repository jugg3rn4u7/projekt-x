define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var GroupModel = require( 'GroupModels/GroupModel' );
	var template   = require( 'text!templates/groups/group.html' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'initialize' : function ( options ) {
			_.bindAll( this );

			this.id = options.id;

			if ( options.group ) {
				this.model = options.group;
			} else if ( options.id ) {
				this.model = new GroupModel( { 'id' : this.id } );
				this.model.bind( 'change', this.render );
				this.model.fetch();
			}

			return this;
		}
	} );
} );