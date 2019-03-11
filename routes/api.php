<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {

	Route::get('plants', 'PlantController@index');
	Route::get('plants/{plant}', 'PlantController@show');

	Route::get('devices', 'DeviceController@show');
	Route::get('devices/{device}', 'DeviceController@show');

<<<<<<< HEAD
Route::group(['react' => 'v1'], function () {
	Route::get('plants', 'PlantController@index');
	
=======
>>>>>>> 110de7bcfe8125ff4be49aa052e1959b06b7f4ea
	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('signup', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});