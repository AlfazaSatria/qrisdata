<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
<title>Administrator | QRIS Data</title>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

<link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />

<script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">

<!-- Charting library -->
<script src="https://unpkg.com/chart.js@^2.9.3/dist/Chart.min.js"></script>
<!-- Chartisan -->
<script src="https://unpkg.com/@chartisan/chartjs@^2.1.0/dist/chartisan_chartjs.umd.js"></script>



<style>
    /* upload image style - Arda */
    .selected-image-preview {
        width: 100%;
        display: none;
        object-fit: contain;
        z-index: -1;
    }

    /* SSV - Arda */
    .is-invalid-response{
        border-color: #dc3545;
        padding-right: calc(1.5em + 0.75rem);
        background-repeat: no-repeat;
        background-position: center right calc(0.375em + 0.1875rem);
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
    .invalid-response{
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #dc3545; }

    .form-control:invalid, .form-control:valid, .is-valid, .is-invalid {
        background-image: none !important }

    label {
        font-weight: bold; }

    tfoot input, thead input {
        width: 100%; }
</style>
