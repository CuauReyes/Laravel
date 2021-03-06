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
		$this->down();
		Schema::connection('mongodb')->create('devices', function (Blueprint $collection) {

			$collection->string('name');
			$collection->string('type');
			$collection->string('description')->nullable();
			$collection->string('img')->nullable();
			$collection->bigInteger('count')->default(0);
			$collection->bigInteger('counter')->default(0);
			$collection->integer('battery')->nullable();
			$collection->array('values')->default([]);
			$collection->integer('status')->nullable();
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
		Schema::connection('mongodb')->dropIfExists('devices');
	}
}
