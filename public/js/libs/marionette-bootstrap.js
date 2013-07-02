define(function( require ) {

var marionette      = require( 'marionette' );
var $               = require( 'jquery' );
var _               = require( 'underscore' );

var GroupHeaderView = require( 'GroupViews/GroupHeaderView' );
var GroupModel      = require( 'GroupModels/GroupModel' );


	var getSize = function( $object ) {

		if( $object.hasClass( 'small' ) ) {
					return 'small';
				} else if( $object.hasClass( 'medium' ) ) {
					return 'medium';
				}

		return 'large';

	}

	marionette.View.prototype.onShowCalled = function( callback ) {

		if( this._isRendered ) {

			var $el = this.$el;

			$el.find( '.group-description' ).each(function( index ) {

				var $this = $( this );
				var size  = getSize( $this );
				var _id   = $this.attr( 'data-group-id' );

				var group = new GroupModel( { '_id' : _id } );

				group.fetch({'success' : function( model, response ){
					var view = new GroupHeaderView( { 'group' : model, 'size' : size } );
					view.render();
					$this.html( view.el );

					if( _.isFunction( callback ) ) {
						callback( $this );
					} else {
						return $this;
					}

				} } );

			} );//.group-description


		}//_isRendered
	}




});


