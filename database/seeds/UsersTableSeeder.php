<?php

use Illuminate\Database\Seeder;
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

		$password = bcrypt('carlos03');
		User::create([
			'name' => 'Carlos Barranco',
			'email' => 'caba9313@gmail.com',
			'password' => $password
		]);
	}
}
