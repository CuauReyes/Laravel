<?php

// Route::view('/{path?}', 'welcome');
Route::any('{all}', function () {
	return view('welcome');
<<<<<<< HEAD
});

Route::get('/plants', function () {
	return view('welcome');
});

Route::get('/admin', function () {
	return view('welcome');
});


Auth::routes();
=======
})
	->where(['all' => '.*']);
>>>>>>> 110de7bcfe8125ff4be49aa052e1959b06b7f4ea


Auth::routes();
