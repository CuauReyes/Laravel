<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'v1'], function () {
	Route::get('plants', 'PlantController@index');
<<<<<<< HEAD
	Route::get('devices', 'DeviceController@mostrar');

	Route::get('sensor', 'DeviceController@mostrarUno');

	Route::get('plants/{plant}', 'PlantController@show');

	//Route::get('devices', 'DeviceController@show');
	//Route::get('devices/{device}', 'DeviceController@show');

=======
	Route::get('plants/{id}', 'PlantController@show');

	Route::get('devices', 'DeviceController@show');
	Route::get('devices/{id}', 'DeviceController@show');
>>>>>>> 2432c83622ce13c175014546f18dbdd63c356479

	Route::group(['prefix' => 'auth'], function () {
		Route::post('login', 'AuthController@login');
		Route::post('signup', 'AuthController@signup');

		Route::group(['middleware' => 'auth:api'], function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});