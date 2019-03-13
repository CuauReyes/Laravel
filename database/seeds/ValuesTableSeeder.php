<?php
use Illuminate\Database\Seeder;
use App\Value;
use App\Device;
use Carbon\Carbon;

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

		$URL = "https://offices_9.data.thethingsnetwork.org/api/v2/query?last=20d";
		$connection = curl_init();

		curl_setopt($connection, CURLOPT_URL, $URL);
		curl_setopt($connection, CURLOPT_HTTPGET, true);
		curl_setopt($connection, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: key ttn-account-v2.uBNF9XTlQ43DfRURMKqLGN31qLS2p5F82d4gsCWUnfM'));
		curl_setopt($connection, CURLOPT_SSLVERSION, 6);
		curl_setopt($connection, CURLOPT_RETURNTRANSFER, 1);

		$response = curl_exec($connection);
		curl_close($connection);
		$values = json_decode($response);

		$devices = Device::all();

		for ($i = 0; $i < count($values); $i++) {

			$idDevice = Device::where('name', '=', $values[$i]->device_id)->firstOrFail()->id;
			$device = Device::find($idDevice);
			$device->count = $device->count + 1;
			$values[$i]->Atype ? $device->type = $values[$i]->Atype : null;

			$parsed = substr($values[$i]->time, 0, -2) . 'Z';
			$parsedDate = new DateTime($parsed);

			Value::create([
				'value' => $values[$i]->Cvalue ? $values[$i]->Cvalue : 0,
				'count' => $device->count,
				'device_id' => $idDevice,
				'created_at' => $parsedDate,
				'updated_at' => $parsedDate
			]);

			$device->save();
		}
	}
}
