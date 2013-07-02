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
		'Vent'                     : 'Vent',
		'App'                      : 'App',
		'Router'                   : 'routers/AppRouter',
		'Controller'               : 'controllers/AppController',
		'Session'                  : 'models/users/SessionModel',


		// User related paths
		'UserModels'               : 'models/users',
		'UserCollections'          : 'collections/users',
		'UserViews'                : 'views/users',
		'UserRoutes'               : 'routers/users',

		// Group related paths
		'GroupModels'              : 'models/groups',
		'GroupCollections'         : 'collections/groups',
		'GroupViews'               : 'views/groups',
		'GroupRoutes'              : 'routers/groups',

		'GroupSettingViews'        : 'views/groups/settings',

		// Notification related paths
		'NotificationsModels'      : 'models/notifications',
		'NotificationsCollections' : 'collections/notifications',
		'NotificationsViews'       : 'views/notifications',

		// Resource related paths
		'ResourceModels'           : 'models/resources',
		'ResourceCollections'      : 'collections/resources',
		'ResourceViews'            : 'views/resources',
		'ResourceRoutes'           : 'routers/resources',

		// Store related paths
		'StoreModels'              : 'models/store',
		'StoreCollections'         : 'collections/store',
		'StoreRoutes'              : 'routers/store',
		'StoreViews'               : 'views/store',

		// Search paths
		'SearchCollections'        : 'collections/search',
		'SearchViews'              : 'views/search',

		//Compenents
		'meter'                    : 'views/components/password-strength-meter/StrengthMeterItemView'

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