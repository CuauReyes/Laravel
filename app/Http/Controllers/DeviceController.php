<?php

namespace App\Http\Controllers;

use App\Device;
use Illuminate\Http\Request;
use File;

class DeviceController extends Controller
{
	/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function index()
	{
		return Device::with('plant')->get();
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
		$device = new Device([
			'name'     => $request->name,
			'type'    => $request->type,
			'plant_id' => $request->plant_id
		]);

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

			if ($device->img) {
				Storage::disk('ftp')->delete($device->img);
			}

			Storage::disk('ftp')->put($filenametostore, $image_resize->stream()->detach());
			$device->img = $filenametostore;
		}

		$device->save();
		return $device->toJson();
	}

	/**
     * Display the specified resource.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
	public function show($id)
	{
		//
		$device = Device::with('plant', 'values')->find($id);

		return response()->json($device, 200);
	}

	/**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
	public function edit(Device $device)
	{
		//
	}

	/**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
	public function update(Request $request, $id)
	{
		$Device = Device::find($id);
		$Device->name = $request->name;
		$Device->type = $request->type;
		$Device->description = $request->description;
		$Device->status = $request->status;

		$Device->save();
	}

	/**
     * Remove the specified resource from storage.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
	public function destroy($id)
	{
		Device::find($id)->delete();
		return response()->json([
			'message' => 'Registro eliminado'
		]);
	}

	public function ON($id)
	{
		$Device = Device::find($id);

		$Device->status = '1';

		$Device->save();
	}
	public function OFF($id)
	{
		$Device = Device::find($id);

		$Device->status = '0';

		$Device->save();
	}

	public function fileUpload(Request $request)
	{
		$deviceId = $request->route('id');
		$device = Device::find($deviceId);

		$this->validate($request, [
			'img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
		]);


		if ($request->hasFile('img')) {

			$image = $request->file('input_img');
			$image_resize = Image::make($image->getRealPath());
			$image_resize->resize(null, 400);

			$filenamewithextension = $image->getClientOriginalName();
			$filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);
			$extension = $image->getClientOriginalExtension();
			$filenametostore = $filename . '_' . uniqid() . '.' . $extension;

			if ($device->img) {
				Storage::disk('ftp')->delete($device->img);
			}

			Storage::disk('ftp')->put($filenametostore, $image_resize->stream()->detach());
			$device->img = $filenametostore;

			$device->save();

			return response()->json([
				'message' => 'Image Upload successfully',
			]);
		}
	}
}
