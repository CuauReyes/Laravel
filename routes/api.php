<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {
	Route::get('plants', 'PlantController@index');
	Route::get('devices', 'DeviceController@mostrar');

	Route::get('deviceID', 'DeviceController@mostrarUno');

	Route::get('plants/{plant}', 'PlantController@show');

	//Route::get('devices', 'DeviceController@show');
	//Route::get('devices/{device}', 'DeviceController@show');


	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('signup', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});