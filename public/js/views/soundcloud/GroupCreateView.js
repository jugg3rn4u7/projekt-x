define( function( require ) {
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var Session    = require( 'Session' );
	var GroupModel = require( 'GroupModels/GroupModel' );
	var template   = require( 'text!templates/groups/groupCreate.html' );

		return Marionette.ItemView.extend( {

			'id' : 'create-groups',

			'template' : _.template( template ),

			'events' : {
				'submit form'                    : 'submitNewGroup',
				'click #new-group-button-cancel' : 'cancelNewGroup',
				'keyup #new-group-name'          : 'nameTextEntered'
			},

			'ui' : {
				'submitBtn' : '#new-group-button-submit'
			},

			'initialized' : function( ) {
				_.bindAll( this );

				return this;
			},

			'render' : function( ) {
				this.$el.html( this.template() );
			},

			'submitNewGroup' : function( event ) {
				event.preventDefault();

				var name = $('#new-group-name').val();

				if ( name !== '' ){
					var description = $('#new-group-description').val();
					var location    = $('#new-group-location').val();
					var province    = $('#new-group-province').val();
					var country     = $('#new-group-country').val();
					var hidden      = $('#new-group-hidden-checkbox').is(':checked');

					var model = {
						'name'                      : name,
						'description'               : description,
						'place.city'                : location,
						'place.subnationalDivision' : province,
						'place.country'             : country,
						'hidden'                    : hidden
					};

					var groupModel = new GroupModel( model );

					groupModel.save( null, {
						'success' : function( model, response ) {
							Backbone.history.navigate( 'groups/' + model.get( '_id' ), true );
						}
					} );
				}
			},

			'cancelNewGroup' : function( event ) {
				Backbone.history.navigate('users/' + Session.id + '/groups',true);
			},

			'nameTextEntered' : function( event ) {
				var val = event.currentTarget.value;

				if ( val !== '' && val.length >= 3) {
					$( this.ui.submitBtn ).removeAttr( 'disabled' );
				} else {
					$( this.ui.submitBtn ).attr( { 'disabled' : 'disabled' } );
				}
			}

		} );
} );
