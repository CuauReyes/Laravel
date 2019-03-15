	<?php

	use Illuminate\Support\Facades\Schema;
	use Illuminate\Database\Schema\Blueprint;
	use Illuminate\Database\Migrations\Migration;

	class CreateValuesTable extends Migration
	{
		/**
     * Run the migrations.
     *
     * @return void
     */
		public function up()
		{

			$this->down();
			Schema::connection('mongodb')->create('values', function (Blueprint $table) {
				$table->bigInteger('count')->default(0);
				$table->string('value');
			});
		}

		/**
     * Reverse the migrations.
     *
     * @return void
     */
		public function down()
		{
			Schema::connection('mongodb')->dropIfExists('values');
		}
	}
