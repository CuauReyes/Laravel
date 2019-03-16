<?php

namespace App\Providers;

use URL;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Routing\UrlGenerator;

class AppServiceProvider extends ServiceProvider
{
	/**
     * Register any application services.
     *
     * @return void
     */
	public function register()
	{
		//
	}

	/**
     * Bootstrap any application services.
     *
     * @return void
     */
	public function boot()
	{
		//
		// if (env('APP_ENV') === 'production') {
		URL::forceScheme('https');
		// $url->forceScheme('https');
		// }
	}
}
