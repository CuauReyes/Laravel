<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
	protected $fillable = [
		'description',
		'name',
		'location',
		'url',
		'key',
		'img',
		'user_id',
	];

	public function user()
	{
		return $this->belongsTo('App\User');
	}

	public function devices()
	{
		return $this->hasMany('App\Device');
	}
}
