define( [
	'jquery',
	'backbone',
	'GroupModels/GroupNavModel'
], function ( $, Backbone, GroupNavModel ) {
	'use strict';

	return Backbone.Collection.extend( {
		'idAttribute' : '_id',

		'initialize' : function ( models, options ) {
			this.groupId = options.groupId;

			return this;
		}

	} );
} );