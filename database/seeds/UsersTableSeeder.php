<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;

class UsersTableSeeder extends Seeder
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
		]);

		$password = ('123');
		User::create([
			'name' => 'Cuau',
			'email' => 'cuau.reyes@outlook.com',
			'password' => $password,
		]);
	}
}
