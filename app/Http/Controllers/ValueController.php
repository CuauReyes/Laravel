<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;
use App\Value;
use App\Events\NewValue;

class ValueController extends Controller
{
	//

	/**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
	public function store(Request $request)
	{
		$data = json_decode($request->getContent(), true);

		$name = $data['dev_id'];

		$device = Device::where('name', '=', $name)->firstOrFail();
		$device->count++;

		if ($device->type == 'COUNTER') {
			$device->counter += $data['payload_fields']['Cvalue'];
		}

		$value = new Value([
			'value' => $data['payload_fields']['Cvalue'],
			'count' => $device->count,
			'device_id' => $device->id
		]);

		$value->save();
		$device->save();


		// event(new NewValue($value));
		broadcast(new NewValue($value));


		return $value->toJson();
	}
}
