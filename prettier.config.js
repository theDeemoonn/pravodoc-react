module.exports = {
	'printWidth': 150,
	'trailingComma': 'none',
	'tabWidth': 2,
	'useTabs': true,
	'semi': false,
	'singleQuote': true,
	'jsxSingleQuote': true,
	'arrowParens': 'avoid',
	'importOrder': [
		'<THIRD_PARTY>',
		'<PROJECT>',
		'<PROJECT_ROOT>/app',
		'^@/types/(.*)$',
		'^../(.*)$',
		'^./(.*)$'
	],
	'importOrderSeparation': true,
	'importOrderSortSpecifiers': true
}