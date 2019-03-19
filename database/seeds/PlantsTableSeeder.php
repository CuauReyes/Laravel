<?php

use Illuminate\Database\Seeder;
use App\Plant;
use App\User;

class PlantsTableSeeder extends Seeder
{
	/**
     * Run the database seeds.
     *
     * @return void
     */
	public function run()
	{
		//$faker = \Faker\Factory::create();

		Plant::create([
			'description' => "lorem",
			'name' => 'Offices 9',
			'location' =>  "lorem",
			'url' => "https://offices_9.data.thethingsnetwork.org/api/v2",
			'key' => "key ttn-account-v2.uBNF9XTlQ43DfRURMKqLGN31qLS2p5F82d4gsCWUnfM",
			'user_id' => 1,
		]);

		Plant::create([
			'description' => "lorem",
			'name' => 'Planta Hidalgo',
			'location' =>  "lorem",
			'url' => "https://impersealco_hgo_quma.data.thethingsnetwork.org/api/v2",
			'key' => "key ttn-account-v2.vprvACF0HslNAe0FLy-zRGTsM35XPwAFS2hsC6RRM-Q",
			'user_id' => 1,
		]);
	}
}
