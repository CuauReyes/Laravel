<?php

Route::any('{all}', function () {
	return view('welcome');
})
	->where(['all' => '.*']);

// Route::any('{all}', function () {
// 	return view('welcome');
// });
// Route::get('/plants', function () {
// 	return view('welcome');
// });

// Route::get('/devices', function () {
// 	return view('welcome');
// });

// Route::get('/sensor', function () {
// 	return view('welcome');
// });

// Route::get('/admin', function () {
// 	return view('welcome');
// });

Auth::routes();
