<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Device;
use App\Plant;

class DevicesTableSeeder extends Seeder
{
	/**
     * Run the database seeds.
     *
     * @return void
     */
	public function run()
	{

		$types = [
			'COUNTER',
			'ON-OFF',
			'OPEN-CLOSE'
		];

		$plants = Plant::all();

		for ($i = 0; $i < count($plants); $i++) {
			$plant = $plants[$i];
			$URL = $plant->url . '/devices';
			$key = $plant->key;

			$connection = curl_init();
			curl_setopt($connection, CURLOPT_URL, $URL);
			curl_setopt($connection, CURLOPT_HTTPGET, true);
			curl_setopt($connection, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: ' . $key));
			curl_setopt($connection, CURLOPT_SSLVERSION, 6);
			curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);
			$response = curl_exec($connection);
			curl_close($connection);
			$devices = json_decode($response);

			for ($j = 0; $j < count($devices); $j++) {
				$type  = $types[rand(0, 2)];

				Device::create([
					'name' => $devices[$j],
					'type' => $type,
					'battery' => 100,
					'status' => 0,
					'plant_id' => $plant->id,
				]);
			}
		}
	}
}
