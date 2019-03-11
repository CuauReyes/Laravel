<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Devices extends Migration
{
	/**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		Schema::dropIfExists('devices');
		Schema::create('devices', function (Blueprint $table) {

			$table->increments('id');
			$table->string('type');
			$table->integer('battery');
			$table->integer('status');
			$table->timestamps();

			$table->integer('plant_id')->unsigned();
			$table->foreign('plant_id')
				->references('id')->on('plants')
				->onDelete('cascade')
				->onUpdate('cascade');
		});
	}

	/**
     * Reverse the migrations.
     *
     * @return void
     */
	public function down()
	{
		Schema::dropIfExists('devices');
	}
}
