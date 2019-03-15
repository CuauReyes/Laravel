<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Value;
use App\Device;
use App\Plant;

class ValuesTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		//


		$plants = Plant::all();

		for ($i = 0; $i < count($plants); $i++) {
			$plant = $plants[$i];
			$URL = $plant->url . '/query?last=20d';
			$key = $plant->key;

			$connection = curl_init();
			curl_setopt($connection, CURLOPT_URL, $URL);
			curl_setopt($connection, CURLOPT_HTTPGET, true);
			curl_setopt($connection, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: ' . $key));
			curl_setopt($connection, CURLOPT_SSLVERSION, 6);
			curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);
			$response = curl_exec($connection);
			curl_close($connection);
			$values = json_decode($response);

			for ($j = 0; $j < count($values); $j++) {

				$idDevice = Device::where('name', '=', $values[$j]->device_id)->firstOrFail()->id;

				$device = Device::find($idDevice);
				$device->count = $device->count + 1;
				$values[$j]->Atype ? $device->type = $values[$j]->Atype : null;

				$parsed = substr($values[$j]->time, 0, -2) . 'Z';
				$parsedDate = new DateTime($parsed);

				Value::create([
					'value' => $values[$j]->Cvalue ? $values[$j]->Cvalue : 0,
					'count' => $device->count,
					'device_id' => $idDevice,
					'created_at' => $parsedDate,
					'updated_at' => $parsedDate
				]);

				$device->save();
			}
		}
	}
}
