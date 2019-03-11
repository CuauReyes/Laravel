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
		$faker = \Faker\Factory::create();

		for ($i = 0; $i < 5; $i++) {
			Plant::create([
				'description' => $faker->paragraph,
				'name' => $faker->sentence,
				'location' => $faker->sentence,
				'url' => $faker->sentence,
				'key' => $faker->sentence,
				'img' => $faker->sentence,
				'user_id' => User::all()->random()->id,
			]);
		}
	}
}
