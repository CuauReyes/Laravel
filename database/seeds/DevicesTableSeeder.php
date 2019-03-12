<?php

use Illuminate\Database\Seeder;
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
		//


		$types = [
			'COUNTER',
			'ON-OFF',
			'OPEN-CLOSE'
		];

		$faker = \Faker\Factory::create();

		$URL = "https://offices_9.data.thethingsnetwork.org/api/v2/devices";
		$connection = curl_init();

		curl_setopt($connection, CURLOPT_URL, $URL);
		curl_setopt($connection, CURLOPT_HTTPGET, true);
		curl_setopt($connection, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: key ttn-account-v2.uBNF9XTlQ43DfRURMKqLGN31qLS2p5F82d4gsCWUnfM'));
		curl_setopt($connection, CURLOPT_SSLVERSION, 6);
		curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);

		$response = curl_exec($connection);
		curl_close($connection);
		$devices = json_decode($response);

		for ($i = 0; $i < count($devices); $i++) {
			$type  = $types[rand(0, 2)];

			Device::create([
				'name' => $devices[$i],
				'type' => $type,
				'battery' => rand(0, 100),
				'status' => 1,
				'plant_id' => 1,
			]);
		}

		for ($i = 0; $i < 152; $i++) {
			$type  = $types[rand(0, 2)];
			Device::create([
				'name' => $faker->sentence,
				'type' => $type,
				'battery' => rand(0, 100),
				'status' => 1,
				'plant_id' => Plant::all()->random()->id,
			]);
		}
	}
}
