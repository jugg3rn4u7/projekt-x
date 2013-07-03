require.config( {

	'paths' : {

		// Libraries and utility scripts
		'jquery'                   : 'libs/jquery',
		'bootstrap'                : 'libs/bootstrap',
		'underscore'               : 'libs/underscore',
		'jquery-cookie'            : 'libs/jquery-cookie',
		'backbone'                 : 'libs/backbone',
		'marionette'               : 'libs/backbone-marionette',
		'subroute'                 : 'libs/backbone.subroute',
		'eventbinder'              : 'libs/backbone.eventbinder',
		'babysitter'               : 'libs/backbone.babysitter',
		'wreqr'                    : 'libs/backbone.wreqr',
		'inflector'                : 'libs/inflector',
		'text'                     : 'libs/text',
		'base64'                   : 'libs/base64',
		'async'                    : 'libs/async',
		'marionette-bootstrap'     : 'libs/marionette-bootstrap',
		'toastr'                   : 'libs/toastr',
		'jquery-fineuploader'      : 'libs/jquery.fineuploader-3.3.1',
		'MiddlewareRouter'         : 'libs/MiddlewareRouter',
		'validation'               : '/shared/validation',
		'redactor'				   : 'libs/redactor',
		'PrettyDate'			   : 'libs/PrettyDate',

		// root folders
		'models'                   : 'models',
		'collections'              : 'collections',
		'views'                    : 'views',
		'templates'                : '../templates',
		'components'               : 'views/components',

		// Base application level classes
		//'Vent'                     : 'Vent',
		//'Controller'               : 'controllers/AppController',
		//'Session'                  : 'models/users/SessionModel',
		'App'					   : 'App',

		// SoundCloud related paths
		'SoundCloudModels'              : 'models/soundcloud',
		'SoundCloudCollections'         : 'collections/soundcloud',
		'SoundCloudViews'               : 'views/soundcloud',
		'SoundCloudRouters'             : 'routers/soundcloud',
		'SoundCloudControllers'         : 'controllers/soundcloud'

	},

	'shim' : {
		'jquery' : {
			'exports': '$'
		},

		'boostrap' : {
			'deps' : [ 'jquery' ]
		},

		'underscore' : {
			'exports': '_'
		},

		'backbone' : {
			'deps'    : [ 'underscore', 'jquery' ],
			'exports' : 'Backbone'
		},

		'marionette' : {
			'deps'    : [ 'backbone' ],
			'exports' : 'Backbone.Marionette'
		},

		'subroute' : {
			'deps'    : [ 'backbone' ],
			'exports' : 'Backbone.SubRoute'
		},

		'eventbinder' : {
			'deps'    : [ 'backbone' ],
			'exports' : 'Backbone.Eventbinder'
		},

		'babysitter' : {
			'deps' : [ 'backbone' ]
		},

		'marionette-bootstrap' : {
			'deps' : [ 'backbone', 'marionette', 'jquery', 'underscore' ]
		},

		'MiddlewareRouter' : {
			'deps'    : [ 'marionette' ],
			'exports' : 'Marionette.MiddlewareRouter'
		},

		'wreqr' : {
			'deps' : [ 'backbone' ]
		},

		'jquery-cookie' : {
			'deps' : [ 'jquery' ]
		},

		'async' : {
			'exports' : 'async'
		},

		'validation' : {
			'exports' : 'validation'
		},

		'deps' : ['jquery','underscore']

	}
} );