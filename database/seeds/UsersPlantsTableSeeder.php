<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;

class UsersPlantsTableSeeder extends Seeder
{
	/**
     * Run the database seeds.
     *
     * @return void
     */
	public function run()
	{

		$password = bcrypt('cabaag');

		User::create([
			'name' => 'Carlos Barranco',
			'email' => 'caba9313@gmail.com',
			'password' => $password,
			'plants' => ['5c91606c837fe1375f13b6ce', '5c91606c837fe1375f13b6cf']
		]);

		$password = ('123');
		User::create([
			'name' => 'Cuau',
			'email' => 'cuau.reyes@outlook.com',
			'password' => $password,
			'plants' => ['5c91606c837fe1375f13b6ce', '5c91606c837fe1375f13b6cf']
		]);
	}
}
