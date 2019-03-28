<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
// Broadcast::routes(['middleware' => ['web', 'auth:admin']]);

Broadcast::channel('App.User.{id}', function ($user, $id) {
	print_r($id);
	return (int)$user->id === (int)$id;
});

Broadcast::channel('devices.{id}', function ($user, $id) {
	// return $user->id == \App\Post::find($id)->user_id;
	return true;
});
