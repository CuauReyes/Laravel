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
		return Plant::with('user', 'devices')->get();
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
			'user_id'     => $request->user_id,
		]);
		$plant->save();
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
		$plant = Plant::with('user', 'devices', 'devices.values')->find($id);

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
	public function destroy(Plant $plant)
	{
		//
	}
}
