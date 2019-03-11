const mix = require('laravel-mix');
var LiveReloadPlugin = require('webpack-livereload-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
// mix.browserSync('my-domain.dev');
mix.webpackConfig({
	plugins: [new LiveReloadPlugin()]
});

mix.react('resources/js/app.jsx', 'public/js')
	.sass('resources/sass/app.scss', 'public/css');
