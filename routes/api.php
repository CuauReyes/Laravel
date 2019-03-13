<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {

	Route::get('users', 'UserController@index');
	Route::get('users/{id}', 'UserController@show');

	Route::get('plants', 'PlantController@index');
	Route::get('plants/{id}', 'PlantController@show');
	Route::post('plants', 'PlantController@store');

	Route::get('devices', 'DeviceController@index');
	Route::get('devices/{id}', 'DeviceController@show');
	Route::post('devices', 'DeviceController@store');

	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('register', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});
