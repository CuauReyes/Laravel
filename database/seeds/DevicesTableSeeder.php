<?php

use Illuminate\Database\Seeder;

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


		for ($i = 0; $i < 50; $i++) {
				$type = array(
					1 => "COUNTER",
					2 => "TEMPERATURE",
					3 => "ON-OFF",
					4 => "OPEN-CLOSE"
				);

				$dato = $type[rand(1, 4)];

				echo $dato;

				$battery = rand(1, 100);

				$status = rand(0, 1);

				DB::table('devices')->insert([
					'type' => $dato,
					'battery' => $battery,
					'status' => $status,
					'plant_id' => rand(1, 5)
				]);
			}
	}
}
