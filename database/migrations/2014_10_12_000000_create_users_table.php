<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{

		$oauth_tables = [
			// 'oauth_access_tokens',
			// 'oauth_auth_codes',
			// 'oauth_clients',
			// 'oauth_personal_access_clients',
			// 'oauth_refresh_tokens'
		];
		foreach ($oauth_tables as $table) {
			DB::statement('DROP TABLE IF EXISTS ' . $table);
		}

		Schema::dropIfExists('users');
		Schema::create('users', function (Blueprint $table) {
			$table->bigIncrements('id')->unique();
			$table->string('name');
			$table->string('email', '120')->unique();
			$table->timestamp('email_verified_at')->nullable();
			$table->string('password');
			$table->rememberToken();
			$table->timestamps();
		});
	}

	/**
     * Reverse the migrations.
     *
     * @return void
     */
	public function down()
	{
		Schema::dropIfExists('users');
	}
}
