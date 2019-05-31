const mix = require('laravel-mix');
var LiveReloadPlugin = require('webpack-livereload-plugin');


mix.webpackConfig({
	// plugins: [new LiveReloadPlugin()],
	node: {
		fs: 'empty'
	},
	externals: [{
			'./cptable': 'var cptable'
		},
		{
			'./jszip': 'jszip'
		}
	]
});

mix.react('resources/js/app.jsx', 'public/js')
	.sass('resources/sass/app.scss', 'public/css');
