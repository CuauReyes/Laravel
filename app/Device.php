<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Device extends Eloquent
{
	protected $connection = 'mongodb';
	protected $collection = 'devices';
	protected $fillable = [
		'name',
		'type',
		'battery',
		'status',
		'count',
		'img',
		'plant_id',
	];

	public function plant()
	{
		return $this->belongsTo('App\Plant');
	}

	public function values()
	{
		return $this->hasMany('App\Value')->orderBy('id', 'desc');
	}

	public function lastValue()
	{
		return $this->hasOne('App\Value')->latest();
	}
}
