define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var template                 = require( 'text!templates/groups/settings/settingsLayout.html' );
	var BreadcrumbCollectionView = require( 'views/components/breadcrumb/BreadcrumbCollectionView' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),
		'tagName'  : 'div',

		'regions' : {
			'header'  : '#groupSettingsHeader',
			'nav'     : '#groupSettingsNavigation',
			'content' : '#groupSettingsContent'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			this.breadCrumbView = new BreadcrumbCollectionView();
			return this;
		},

		'onRender' : function () {

			this.nav.show( this.breadCrumbView );
			this.listenTo( Vent, 'GroupSettings:changeNav', function ( routes, options ) {
				this.breadCrumbView.update( routes );
			}, this );


			this.listenTo( Vent, 'GroupSettings:changeContent', function ( View, options ) {
				if ( typeof View === 'function' ) {
					View = new View( options );
				}

				this.content.show( View );
			}, this );

			return this;
		}
	} );
} );