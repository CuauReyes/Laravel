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
		Schema::connection('mongodb')->create('users', function (Blueprint $collection) {
			$collection->index('id');
			$collection->string('name');
			$collection->unique('email', '120');
			$collection->timestamp('email_verified_at')->nullable();
			$collection->string('password');
			$collection->string('status')->nullable();
			$collection->array('plant_ids')->nullable();
			$collection->rememberToken();
			$collection->timestamps();
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
