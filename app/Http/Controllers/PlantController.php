<?php

namespace App\Http\Controllers;

use App\Plant;
use App\Device;
use Illuminate\Http\Request;

class PlantController extends Controller
{
	/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function index()
	{
		//
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
			'img' => $request->img,
			'status'     => $request->status,
		]);
		$plant->save();

		if ($request->user_id) {
			$plant->users()->attach($request->user_id);
		}
	}

	/**
     * Display the specified resource.
     *
     * @param  \App\Plant  $plant
     * @return \Illuminate\Http\Response
     */
	public function show($id)
	{
		//
		$plant = Plant::with('users', 'devices', 'devices.lastValue')->find($id);

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
	public function update(Request $request, Plant $plant)
	{
		//
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
}
