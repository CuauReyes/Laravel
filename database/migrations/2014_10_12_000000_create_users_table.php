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
		$this->down();
		Schema::connection('mongodb')->create('users', function (Blueprint $table) {
			$table->index('id');
			$table->string('name');
			$table->unique('email', '120');
			$table->timestamp('email_verified_at')->nullable();
			$table->string('password');
			$table->string('status')->nullable();
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
		Schema::connection('mongodb')->dropIfExists('users');
	}
}
