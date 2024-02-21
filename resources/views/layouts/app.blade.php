<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
    @include('includes.script')
</head>

<body>
    <div id="app">
        @include('includes.navbar')
        @include('includes.sidebar')

        <div class="main-content">
            <section class="section">
                <div class="section-header" style="display:block">
                    <h1>@yield('title') - {{ auth()->user()->name }}</h1>
                    @yield('action')
                </div>
                <div class="section-body">
                    @yield('content')
                </div>
            </section>
            @yield('modal')
        </div>
    </div>

    <footer class="main-footer">
        <div class="footer-left">
            Copyright &copy; 2023
            <div class="bullet"></div>
        </div>
   
    </footer>

</body>
</html>