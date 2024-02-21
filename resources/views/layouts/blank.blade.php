<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
    @include('includes.script')
</head>

<body>
    <div id="app">
        <main>
            @yield('content')
        </main>
    </div>


</body>

</html>