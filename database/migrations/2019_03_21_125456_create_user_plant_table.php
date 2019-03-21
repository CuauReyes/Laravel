<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserPlantTable extends Migration
{
	/**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		$this->down();

		Schema::connection('mongodb')->create('user_table', function (Blueprint $collection) {
			$collection->string('user_id')->nullable();
			$collection->string('plant_id')->nullable();
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
		Schema::connection('mongodb')->dropIfExists('user_table');
	}
}
