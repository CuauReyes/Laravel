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
		'plant_id',
	];

	public function plant()
	{
		return $this->belongsTo('App\Plant');
	}
}
