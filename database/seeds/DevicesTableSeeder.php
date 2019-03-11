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

		for ($i = 0; $i < 152; $i++) {
			$type  = $types[rand(0, 2)];
			Device::create([
				'type' => $type,
				'battery' => rand(0, 100),
				'status' => 1,
				'plant_id' => Plant::all()->random()->id,
			]);
		}
	}
}
