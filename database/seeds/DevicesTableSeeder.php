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


		$faker = \Faker\Factory::create();

		for ($i = 0; $i < 52; $i++) {
			Device::create([
				'type' => $faker->sentence,
				'battery' => 100,
				'status' => 1,
				'plant_id' => Plant::all()->random()->id,
			]);
		}
	}
}
