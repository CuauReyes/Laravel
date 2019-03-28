<?php

use App\Http\Controllers\HomeController;


Route::any('{all}', function () {
	return view('welcome');
})
	->where(['all' => '.*']);

Auth::routes();
