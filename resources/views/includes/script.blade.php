<!-- General JS Scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js" ></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js" defer></script>
<script src="{{ mix('js/app-plugin.js') }}" type="text/javascript"></script>
<script src="{{ asset('dist/assets/js/stisla.js') }}" ></script>

<script>

    $(document).ready(function() {

        $('form, input, select').attr('autocomplete', 'off');

        $('.is-invalid').on('change', function(){
            $(this).removeClass('is-invalid');
            $(this).siblings('.invalid-feedback').html('');
            $(this).parent().siblings('.invalid-feedback').html('');
        });

        $('.is-invalid-response').on('change', function(){
            $(this).removeClass('is-invalid-response');
            $(this).siblings('.invalid-response').html('');
            $(this).parent().siblings('.invalid-response').html('');
        });

        $('.select-image').change(function(){
            var input =  $(this);
            var inputElement = input[0];
            input.siblings('#image-label').show();
            input.siblings('.selected-image-preview').hide();
            input.parent().siblings('.selected-image-preview').hide();
            if (inputElement.files && inputElement.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    input.siblings('#image-label').hide();
                    input.siblings('.selected-image-preview').show();
                    input.siblings('.selected-image-preview').attr('src', e.target.result);
                    input.parent().siblings('.selected-image-preview').show();
                    input.parent().siblings('.selected-image-preview').attr('src', e.target.result);
                }
                reader.readAsDataURL(inputElement.files[0]);
            }
        });

        $(".add-more").click(function(){
            var html = $(".copy").html();
            $(".after-add-more").append(html);
        });

        $("body").on("click",".remove",function(){
            $(this).parents(".control-group").remove();
        });

        $('.datatables-onview').DataTable({ "scrollX": true }).columns.adjust();

        var errorMessage = "{{ session('errorMessage') }}";
        var successMessage = "{{ session('successMessage') }}";
        if(!!successMessage){
            iziToast.success({
                title: 'Sukses!',
                message: successMessage,
                position: 'topRight'
            });
        } else if(errorMessage) {
            iziToast.error({
                title: 'Gagal',
                message: errorMessage,
                position: 'topRight'
            });
        }

        var errorModalMessage = "{{ session('errorModalMessage') }}";
        var successModalMessage = "{{ session('successModalMessage') }}";
        if(!!successModalMessage){
            swal({
                title: 'Berhasil',
                text: successModalMessage,
                icon: 'success',
                buttons: true,
            });
        } else if(!!errorModalMessage) {
            swal({
                title: 'Gagal',
                text: errorModalMessage,
                icon: 'warning',
                buttons: true,
            });
        }
    });

</script>