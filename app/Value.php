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

	public function device()
	{
		return $this->belongsTo('App\Device');
	}
}
