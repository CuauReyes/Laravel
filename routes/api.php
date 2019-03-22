<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {

	Route::get('users', 'UserController@index');
	Route::get('users/{id}', 'UserController@show');
	Route::post('users', 'UserController@store');
	Route::delete('users/{id}', 'UserController@destroy');
	Route::put('users/{id}/ON', 'UserController@ON');
	Route::put('users/{id}/OFF', 'UserController@OFF');
	Route::put('users/{id}/addPlant', 'UserController@addPlant');
	Route::put('users/{id}/removePlant', 'UserController@removePlant');

	Route::get('plants', 'PlantController@index');
	Route::get('plants/{id}', 'PlantController@show');
	Route::post('plants', 'PlantController@store');
	Route::delete('plants/{id}', 'PlantController@destroy');
	Route::put('plants/{id}/ON', 'PlantController@ON');
	Route::put('plants/{id}/OFF', 'PlantController@OFF');
	Route::put('plants/{id}/addUser', 'PlantController@addUser');
	Route::put('plants/{id}/removeUser', 'PlantController@removeUser');
	Route::post('plants/{id}/image', 'DeviceController@fileUpload');

	Route::get('devices', 'DeviceController@index');
	Route::get('devices/{id}', 'DeviceController@show');
	Route::post('devices', 'DeviceController@store');
	Route::delete('devices/{id}', 'DeviceController@destroy');
	Route::put('devices/{id}/ON', 'DeviceController@ON');
	Route::put('devices/{id}/OFF', 'DeviceController@OFF');
	Route::post('devices/{id}/image', 'DeviceController@fileUpload');

	Route::post('values', 'ValueController@store');

	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('register', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});
