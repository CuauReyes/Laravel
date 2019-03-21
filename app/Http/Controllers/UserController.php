<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
	/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	public function index()
	{
		return User::with('plants', 'plants.devices')->get();
	}


	/**
     * Display the specified resource.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
	public function show($id)
	{
		//
		$user = User::with('plants', 'plants.devices')->find($id);

		return response()->json($user, 200);
	}

	/**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
	public function edit(User $User)
	{
		//
	}

	public function store(Request $request)
	{

		$request->validate([
			'name'     => 'required|string',
			'email'    => 'required|string|email|unique:users',
			'status'   => 'required|integer',
			'password' => 'required|string|confirmed',
		]);

		$user = new User([
			'name'     => $request->name,
			'email'    => $request->email,
			'plants'    => $request->plants,
			'status'    => $request->status,
			'password' => bcrypt($request->password),
		]);
		$user->save();

		if ($request->plant_id) {
			$user->plants()->attach($request->plant_id);
		}
	}


	/**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
	public function update(Request $request, User $User)
	{
		//
	}

	/**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
	public function destroy($id)
	{
		User::find($id)->delete();
		return response()->json([
			'message' => 'Registro eliminado'
		]);
	}

	public function ON($id)
	{
		$User = User::find($id);

		$User->status = '1';

		$User->save();
	}
	public function OFF($id)
	{
		$User = User::find($id);

		$User->status = '0';

		$User->save();
	}

	public function addPlant(Request $request)
	{

		if (!$request->plant_id) {
			return;
		}
		$userId = $request->route('id');

		$user = User::find($userId);

		$user->plants()->attach($request->plant_id);
		$user->save();
	}
}
