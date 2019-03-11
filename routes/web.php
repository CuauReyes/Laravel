<?php

// Route::view('/{path?}', 'welcome');
Route::any('{all}', function () {
	return view('welcome');
})
	->where(['all' => '.*']);


Auth::routes();
