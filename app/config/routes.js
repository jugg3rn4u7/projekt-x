module.exports = {

	'subapp': {
		'GET' 	: {
			'basic' 					: 'getBasic',
			'dev-utils/information' 	: 'information'
		},
		'POST'	: {
			'basic' : 'createBasic'
		},
		'PUT' 	: {
			'basic' : 'updateBasic'
		},
		'DELETE': {
			'basic' : 'deleteBasic'
		}
	}

};