<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
				//
				DB::table('users')->insert([
					'name' => 'Carlos Barranco',
					'email' => 'caba9313@gmail.com',
					'password' => 'carlos03'
				]);
    }
}
