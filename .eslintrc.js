module.exports = {
	'env': {
		'browser': true,
		'amd': true,
		'node': true
	},
	'extends': ['eslint:recommended', 'plugin:sonarjs/recommended'],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': ['sonarjs'],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
