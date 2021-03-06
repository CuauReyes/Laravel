<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use DesignMyNight\Mongodb\Auth\User as Authenticatable;
use Jenssegers\Mongodb\Eloquent\HybridRelations;

class User extends Authenticatable
{
	use HasApiTokens, Notifiable;
	use HybridRelations;
	protected $connection = 'mongodb';
	protected $collection = 'users';
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name', 'email', 'password', 'status'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
	];

	public function plants()
	{
		return $this->belongsToMany('App\Plant', null, 'user_ids', 'plant_ids');
	}

	/**
 * The channels the user receives notification broadcasts on.
 *
 * @return string
 */
	public function receivesBroadcastNotificationsOn()
	{
		return 'App.User.' . $this->id;
	}
}
