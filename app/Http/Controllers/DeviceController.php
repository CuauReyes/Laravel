<?php

namespace App\Http\Controllers;

use App\Device;
use Illuminate\Http\Request;

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
		//
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
		$denuncia = Device::with('plant')->find($id);

		return response()->json($denuncia, 200);
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
	public function update(Request $request, Device $device)
	{
		//
	}

	/**
     * Remove the specified resource from storage.
     *
     * @param  \App\Device  $device
     * @return \Illuminate\Http\Response
     */
<<<<<<< HEAD
    public function destroy(Device $device)
    {
        //
    }

    public function mostrar()
    {
        $URL = "https://offices_9.data.thethingsnetwork.org/api/v2/devices";
        $conexion = curl_init();

            curl_setopt($conexion, CURLOPT_URL, $URL);
            curl_setopt($conexion, CURLOPT_HTTPGET, TRUE);
            curl_setopt($conexion, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: key ttn-account-v2.uBNF9XTlQ43DfRURMKqLGN31qLS2p5F82d4gsCWUnfM'));
            curl_setopt($conexion, CURLOPT_SSLVERSION, 6);
            curl_setopt($conexion, CURLOPT_RETURNTRANSFER, 1);
    
        $respuesta = curl_exec($conexion);
        curl_close($conexion);
        $Devices = json_decode($respuesta);
        return ($Devices);
    }

    public function mostrarUno()
    {
        $URL = "https://offices_9.data.thethingsnetwork.org/api/v2/query?last=10d";
        $conexion = curl_init();

            curl_setopt($conexion, CURLOPT_URL, $URL);
            curl_setopt($conexion, CURLOPT_HTTPGET, TRUE);
            curl_setopt($conexion, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: key ttn-account-v2.uBNF9XTlQ43DfRURMKqLGN31qLS2p5F82d4gsCWUnfM'));
            curl_setopt($conexion, CURLOPT_SSLVERSION, 6);
            curl_setopt($conexion, CURLOPT_RETURNTRANSFER, 1);
    
        $respuesta = curl_exec($conexion);
        curl_close($conexion);
        $Devices = json_decode($respuesta);
        return ($Devices);
    }
=======
	public function destroy(Device $device)
	{
		//
	}
>>>>>>> 462494ace145b410a721df8fac5682e9642005a5
}
