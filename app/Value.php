<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
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
