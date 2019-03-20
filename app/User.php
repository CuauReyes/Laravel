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
		'name', 'email', 'password', 'status', 'plants'
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
		return $this->hasMany('App\Plant');
	}
}
