<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('includes.head')
    @include('includes.script')
</head>

<body>
    <div id="app">
    <div class="container" style="margin-top:20px">
        <main>
        <section class="section">
                <div class="section-header" style="display:block">
                    <h1>@yield('title')</h1>
                </div>
                <div class="section-body">
                    @yield('content')
                </div>
            </section>
        </main>
    </div>
    <footer class="main-footer">
        <div class="footer-left">
            Copyright &copy; 2021
            <div class="bullet"></div>
        </div>
        <div class="footer-right">Panen - Panen Admin</div>
    </footer>

    <script>
     $(document).ready(function()
    {
      $('select[name="province_id"]').on('change', function() {
        $('select[name="city_id"]').removeAttr("disabled");
          var provID = $(this).val();
          if(provID) {
              $.ajax({
                  url: '/register/show/city/'+provID,
                  type: "GET",
                  dataType: "json",
                  success:function(data) {                      
                      $('select[name="city_id"]').empty();
                      $('select[name="city_id"]').append('<option value="" disabled selected>Pilih Kota/Kabupaten</option>');
                      $.each(data, function(key, value) {
                          $('select[name="city_id"]').append('<option value="'+ key +'">'+ value +'</option>');
                      });
                  }
              });
          }
          else{
              $('select[name="city_id"]').empty();
          }
      });

      $('select[name="city_id"]').on('change', function() {
        $('select[name="subdistrict_id"]').removeAttr("disabled");
          var cityID = $(this).val();
          if(cityID) {
              $.ajax({
                  url: '/register/show/subdistrict/'+cityID,
                  type: "GET",
                  dataType: "json",
                  success:function(data) {                      
                      $('select[name="subdistrict_id"]').empty();
                      $('select[name="subdistrict_id"]').append('<option value="" disabled selected>Pilih Kecamatan</option>');
                      $.each(data, function(key, value) {
                          $('select[name="subdistrict_id"]').append('<option value="'+ key +'">'+ value +'</option>');
                      });
                  }
              });
          }else{
              $('select[name="subdistrict_id"]').empty();
          }
      });
  });
//   $('#register').submit(function () {
//     e.preventDefault();
//     $("#save-data").addClass("btn disabled btn-success btn-progress");
//   });

  
    
    </script>


</body>

</html>