<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title> NoTE </title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <!-- Styles -->
    <!-- Styles -->
    @if (config('app.env') === 'production')
    <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
    @endif
    @if (config('app.env') !== 'production')
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @endif

</head>

<body>
    <div id="app"></div>

    @if (config('app.env') === 'production')
    <script src="{{ secure_asset('js/app.js') }}" defer></script>
    @endif
    @if (config('app.env') !== 'production')
    <script src="{{ asset('js/app.js') }}" defer></script>
    @endif
</body>

</html>
