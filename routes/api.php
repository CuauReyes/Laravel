<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {

	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('register', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});

	Route::group(['prefix' => 'users'], function () {
		Route::get('', 'UserController@index');
		Route::post('', 'UserController@store');
		Route::get('{id}', 'UserController@show');
		Route::delete('{id}', 'UserController@destroy');
		Route::put('{id}/ON', 'UserController@ON');
		Route::put('{id}/OFF', 'UserController@OFF');
		Route::put('{id}/addPlant', 'UserController@addPlant');
		Route::put('{id}/removePlant', 'UserController@removePlant');
	});

	Route::group(['prefix' => 'plants'], function () {
		Route::get('', 'PlantController@index');
		Route::post('', 'PlantController@store');
		Route::get('{id}', 'PlantController@show');
		Route::delete('{id}', 'PlantController@destroy');
		Route::put('{id}/ON', 'PlantController@ON');
		Route::put('{id}/OFF', 'PlantController@OFF');
		Route::put('{id}/addUser', 'PlantController@addUser');
		Route::put('{id}/removeUser', 'PlantController@removeUser');
		Route::post('{id}/image', 'PlantController@fileUpload');
	});

	Route::group(['prefix' => 'devices'], function () {
		Route::get('', 'DeviceController@index');
		Route::post('', 'DeviceController@store');
		Route::get('{id}', 'DeviceController@show');
		Route::delete('{id}', 'DeviceController@destroy');
		Route::put('{id}/ON', 'DeviceController@ON');
		Route::put('{id}/OFF', 'DeviceController@OFF');
		Route::post('{id}/image', 'DeviceController@fileUpload');
	});

	Route::post('values', 'ValueController@store');
});
