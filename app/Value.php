<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Value extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'values';

	//
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'count', 'value', 'device_id'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'device_id', 'updated_at'
	];

	public function device()
	{
		return $this->belongsTo('App\Device');
	}
}
