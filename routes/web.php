<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
	return view('welcome');
});

Route::get('/plants', function () {
	return view('welcome');
});

Route::get('/admin', function () {
	return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/api/v1/getDevice', 'DeviceController@index')->name('device.index');

Route::get('/api/v1/getPlant', 'PlantController@index')->name('plant.index');

