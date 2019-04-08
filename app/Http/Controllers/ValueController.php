<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;
use App\Value;
use App\Events\NewValue;
use DateTime;
use Carbon\Carbon;

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

		print_r($data);

		$name = $data['dev_id'];

		$device = Device::where('name', '=', $name)->firstOrFail();
		$count = $device->count + 1;

		if ($device->type == 'COUNTER') {
			$device->counter += $data['payload_fields']['Cvalue'];
		}

		$value = new Value([
			'value' => $data['payload_fields']['Cvalue'],
			'count' => $count,
			'device_id' => $device->id
		]);

		$value->save();

		// $parsed = substr($data['metadata']['time'], 0, -2) . 'Z';
		// $parsedDate = new DateTime($parsed);
		// $valueElem = [
		// 	'id' => $count,
		// 	'value' => $data['payload_fields']['Cvalue'],
		// 	'count' => $count,
		// 	'device_id' => $device->id,
		// 	'created_at' => new \MongoDB\BSON\UTCDateTime($parsedDate),
		// ];

		// $device->push('values', $valueElem);

		$device->save();

		broadcast(new NewValue($value));

		return $value->toJson();
	}
}
