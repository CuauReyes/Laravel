<?php

use Illuminate\Database\Seeder;

class PlantsTableSeeder extends Seeder
{
	/**
     * Run the database seeds.
     *
     * @return void
     */
	public function run()
	{
		DB::table('plants')->insert([
			'name' => 'Carlos Barranco',
			'location' => 'Hidalgo',
			'url' => 'url',
			'key' => 'key',
			'img' => 'img',
			'status' => 1,
		]);

		for ($i = 0; $i < 5; $i++) {
			$name = array(
				1 => "planta1",
				2 => "planta2",
				3 => "planta3",
				4 => "planta4"
			);
			$locations = array(
				1 => "HIDALGO",
				2 => "MEXICO",
				3 => "JALISCO",
				4 => "NUEVO-LEON"
			);
			$urli = array(
				1 => "caergaegae",
				2 => "aetheathaect",
				3 => "caehethaecha",
				4 => "jtuktykfhsrjy"
			);
			$key = array(
				1 => "srthrthrthrthsrter",
				2 => "hzergthgfjyxtewzrt",
				3 => "gthrdseryjhtejrgear",
				4 => "gaergrtjsrjrsthrhsth"
			);

			$imgs = array(
				1 => "audi.png",
				2 => "nissan.png",
				3 => "hyundai.png",
				4 => "vw.png"
			);

			$llave = $key[rand(1, 4)];

			$url = $urli[rand(1, 4)];

			$location = $locations[rand(1, 4)];

			$nombre = $name[rand(1, 4)];
			$img = $imgs[rand(1, 4)];

			echo $nombre;

			$status = rand(0, 1);

			DB::table('plants')->insert([
				'name' => $nombre,
				'description' => 'loremasdkasdlk amsdk alskmdalsdmka lk',
				'location' => $location,
				'url' => $url,
				'key' => $llave,
				'img' => $img,
				'status' => $status,
			]);
		}
	}
}
