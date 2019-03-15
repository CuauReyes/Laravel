<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePasswordResetsTable extends Migration
{
	/**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		$this->down();
		Schema::connection('mongodb')->create('password_resets', function (Blueprint $collection) {
			$collection->string('email', '120')->index();
			$collection->string('token');
			$collection->timestamp('created_at')->nullable();
		});
	}

	/**
     * Reverse the migrations.
     *
     * @return void
     */
	public function down()
	{
		Schema::connection('mongodb')->dropIfExists('password_resets');
	}
}
