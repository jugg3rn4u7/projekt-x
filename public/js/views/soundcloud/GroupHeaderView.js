define( function ( require  ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var GroupModel          = require( 'GroupModels/GroupModel' );
	var groupTemplate       = require( 'text!templates/groups/groupHeader.html' );
	var groupTemplateMedium = require( 'text!templates/groups/groupHeaderMedium.html' );
	var groupTemplateSmall  = require( 'text!templates/groups/groupHeaderSmall.html' );

	return Marionette.ItemView.extend( {
		'template'         : _.template( groupTemplate ),
		'medium-template'  : _.template( groupTemplateMedium ),
		'small-template'   : _.template( groupTemplateSmall ),

		'initialize' : function ( options ) {
			_.bindAll( this );

			this.model = options.group;
			return this;
		},

		'getTemplate': function( callback ){

			var template;

			if ( this.options.size == 'small' ) {
				template = this['small-template'];
			} else if ( this.options.size == 'medium' ) {
				template = this['medium-template'];
			} else {
				template = this.template;
			}

			return template;
		}
	} );

} );