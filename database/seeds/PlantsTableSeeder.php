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

		Plant::create([
			'description' => '$faker->paragraph',
			'name' => 'Offices 9',
			'location' => '$faker->sentence',
			'url' => "https://offices_9.data.thethingsnetwork.org/api/v2",
			'key' => "key ttn-account-v2.uBNF9XTlQ43DfRURMKqLGN31qLS2p5F82d4gsCWUnfM",
			'user_id' => User::all()[0]->id
		]);

		Plant::create([
			'description' => '$faker->paragraph',
			'name' => 'Planta Hidalgo',
			'location' => '$faker->sentence',
			'url' => "https://impersealco_hgo_quma.data.thethingsnetwork.org/api/v2",
			'key' => "key ttn-account-v2.vprvACF0HslNAe0FLy-zRGTsM35XPwAFS2hsC6RRM-Q",
			'user_id' => User::all()[0]->id,
		]);
	}
}
