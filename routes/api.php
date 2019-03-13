<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {

	Route::get('users', 'AuthController@allUsers');
	Route::post('users', 'AuthController@store');

	Route::get('plants', 'PlantController@index');
	Route::post('plants', 'PlantController@store');

	Route::get('plants/{id}', 'PlantController@show');

	Route::get('devices', 'DeviceController@index');
	Route::get('devices/{id}', 'DeviceController@show');
	Route::post('devices', 'DeviceController@store');

	//Route::get('devices', 'DeviceController@show');
	//Route::get('devices/{device}', 'DeviceController@show');

	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('register', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});
