<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Device;
use App\Value;
use App\Plant;
use App\Events\NewValue;
use DateTime;
use Carbon\Carbon;
use GuzzleHttp;

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

		$plant = Plant::find($device->plant_id);

		if (isset($plant->resendUrl)) {

			$client = new GuzzleHttp\Client();
			$res = $client->request('POST', $plant->resendUrl,
				['json' => ['value' => $data['payload_fields']['Cvalue']]]
			);
		}

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
		$device->save();

		broadcast(new NewValue($value));

		return $value->toJson();
	}


	public function resend($url)
	{
		$client = new GuzzleHttp\Client();
		$res = $client->request('POST', url,
			['json' => ['value' => $request->value]]
		);
		return $res->getBody();
	}

}
