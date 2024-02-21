const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

    mix.styles([
        'public/dist/bootstrap.min.css',
        'public/dist/select2/dist/css/select2.min.css',
        'public/dist/bootstrap-daterangepicker/daterangepicker.css',
        'public/dist/selectric/public/selectric.css',
        'public/dist/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
        'public/dist/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
        'public/dist/summernote/dist/summernote-bs4.css',
        'public/dist/assets/css/style.css',
        'public/dist/assets/css/components.css',
        'public/dist/dataTables.bootstrap4.min.css',
        'public/dist/izitoast/css/iziToast.min.css',
    ], 'public/css/app.css');
    
    mix.scripts([
        'public/dist/cleave.js/dist/cleave.min.js',
        'public/dist/cleave.js/dist/addons/cleave-phone.us.js',
        'public/dist/jquery-pwstrength/jquery.pwstrength.min.js',
        'public/dist/bootstrap-daterangepicker/daterangepicker.js',
        'public/dist/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
        'public/dist/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js',
        'public/dist/select2/dist/js/select2.full.min.js',
        'public/dist/selectric/public/jquery.selectric.min.js',
        'public/dist/summernote/dist/summernote-bs4.js',
        'public/dist/izitoast/js/iziToast.min.js',
        'public/dist/sweetalert/js/sweetalert.min.js',
        'public/dist/assets/js/scripts.js',
        'public/dist/assets/js/custom.js',
        'public/dist/assets/js/page/forms-advanced-forms.js',
        'public/dist/assets/js/page/bootstrap-modal.js'
    ], 'public/js/app-plugin.js');