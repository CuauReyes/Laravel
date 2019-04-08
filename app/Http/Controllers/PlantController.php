<?php

namespace App\Http\Controllers;

use App\Plant;
use App\Device;
use Illuminate\Http\Request;
use File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;


class PlantController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		return Plant::with('users', 'devices')->get();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$plant = new Plant([
			'name'     => $request->name,
			'description'     => $request->description,
			'location'     => $request->location,
			'url'     => $request->url,
			'key'     => $request->key,
			'status'     => $request->status,
		]);

		if ($request->user_id) {
			$plant->users()->attach($request->user_id);
		}

		if ($request->hasFile('img')) {
			$this->validate($request, [
				'img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
			]);

			$image = $request->file('input_img');
			$image_resize = Image::make($image->getRealPath());
			$image_resize->resize(null, 400);

			$filenamewithextension = $image->getClientOriginalName();
			$filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);
			$extension = $image->getClientOriginalExtension();
			$filenametostore = $filename . '_' . uniqid() . '.' . $extension;

			if ($plant->img) {
				Storage::disk('ftp')->delete($plant->img);
			}

			Storage::disk('ftp')->put($filenametostore, $image_resize->stream()->detach());
			$plant->img = $filenametostore;
		}

		$plant->save();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Plant $plant
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$plant = Plant::with('users', 'devices', 'devices.lastValue')->find($id);

		// foreach ($plant->devices as $device) {
		// 	$count = count($device->values);
		// 	$device->last_value = $device->values[$count - 1];
		// 	unset($device->values);
		// }

		return response()->json($plant, 200);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Plant  $plant
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Plant $plant)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Plant  $plant
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		$Plant = Plant::find($id);
		$Plant->name = $request->name;
		$Plant->description = $request->description;
		$Plant->location = $request->location;
		$Plant->url = $request->url;
		$Plant->key = $request->key;

		$Plant->save();
		//print_r('Acceso ok');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Plant  $plant
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		Plant::find($id)->delete();
		return response()->json([
			'message' => 'Registro eliminado'
		]);
	}
	public function ON($id)
	{
		$Plant = Plant::find($id);

		$Plant->status = '1';

		$Plant->save();
	}

	public function OFF($id)
	{
		$Plant = Plant::find($id);

		$Plant->status = '0';

		$Plant->save();
	}

	public function fileUpload(Request $request)
	{

		$plantId = $request->route('id');
		$plant = Plant::find($plantId);

		if ($request->hasFile('input_img')) {
			$this->validate($request, [
				'input_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
			]);

			$image = $request->file('input_img');
			$image_resize = Image::make($image->getRealPath());
			$image_resize->resize(null, 400);

			$filenamewithextension = $image->getClientOriginalName();
			$filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);
			$extension = $image->getClientOriginalExtension();
			$filenametostore = $filename . '_' . uniqid() . '.' . $extension;

			if ($plant->img) {
				Storage::disk('ftp')->delete($plant->img);
			}

			Storage::disk('ftp')->put($filenametostore, $image_resize->stream()->detach());
			$plant->img = $filenametostore;
			$plant->save();

			return response()->json([
				'message' => 'Image Upload successfully',
			]);
		}
	}

	public function addUser(Request $request)
	{
		if (!$request->user_id) {
			return;
		}
		$plantId = $request->route('id');

		$plant = Plant::find($plantId);

		$plant->users()->attach($request->user_id);
		$plant->save();
	}

	public function removeUser(Request $request)
	{

		if (!$request->user_id) {
			return back()->with('failed', 'Not a user id');
		}
		$plantId = $request->route('id');

		$plant = Plant::find($plantId);

		$plant->plants()->dettach($request->user_id);
		$plant->save();

		return back()->with('success', 'User removed');
	}
}
