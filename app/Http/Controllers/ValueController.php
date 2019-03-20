<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;
use App\Value;

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
		print_r($request->getContent());
		$data = json_decode($request->getContent(), true);

		print_r($data);
		$name = $data['dev_id'];
		$device = Device::where('name', '=', $name)->firstOrFail();
		$device->count = $device->count + 1;


		$value = new Value([
			'value' => $data['payload_fields']['CValue'],
			'count' => $device->count,
			'device_id' => $device->id
		]);
		$value->save();
		$device->save();
	}
}
