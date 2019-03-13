<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
	protected $fillable = [
		'name',
		'type',
		'battery',
		'status',
		'count',
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
}
