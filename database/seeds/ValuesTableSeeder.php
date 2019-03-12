<?php
use Illuminate\Database\Seeder;
use App\Value;
use App\Device;

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

			Value::create([
				'value' => $values[$i]->Cvalue ? $values[$i]->Cvalue : 0,
				'count' => $device->count,
				'device_id' => $idDevice
			]);

			$device->save();
		}

		for ($i = 0; $i < count($devices); $i++) {
			$device = Device::find($devices->get($i)->id);

			for ($j = 0; $j < 50; $j++) {
				$device->count = $device->count + 1;

				if ($device->type === 'ON-OFF') {
					Value::create([
						'value' => strval(rand(0, 1)),
						'count' => $device->count,
						'device_id' => $device->id
					]);
				}

				if ($device->type === 'OPEN-CLOSE') {
					Value::create([
						'value' => strval(rand(0, 1)),
						'count' => $device->count,
						'device_id' => $device->id
					]);
				}

				if ($device->type === 'COUNTER') {
					Value::create([
						'value' => strval($device->count),
						'count' => $device->count,
						'device_id' => $device->id
					]);
				}
				$device->save();
			}
		}
	}
}
