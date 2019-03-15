<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Plants extends Migration
{
	/**
     * Run the migrations.
     *
     * @return void
     */
	public function up()
	{
		$this->down();
		Schema::connection('mongodb')->create('plants', function (Blueprint $collection) {
			$collection->string('name');
			$collection->text('description')->nullable();
			$collection->string('location')->nullable();
			$collection->string('url');
			$collection->string('key');
			$collection->string('img')->nullable();
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
		Schema::connection('mongodb')->dropIfExists('plants');
	}
}
