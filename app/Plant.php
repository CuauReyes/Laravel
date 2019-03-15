<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Plant extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'plants';
	protected $fillable = [
		'description',
		'name',
		'location',
		'url',
		'key',
		'img',
		'status',
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

	public function values()
	{
		return $this->hasManyThrough('App\Device', 'App\Value');
	}
}
