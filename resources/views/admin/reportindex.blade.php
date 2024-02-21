@extends('layouts.app')
@section('title', 'Report Data')
@section('content')

<div class="card">
    <div class="card-header">
        <h4>Daftar Transakasi</h4>

    </div>

    <div class="card-body">
        <div class="table-responsive">
            <table id="table-transaction" class="table table-striped table-bordered" style="width: 100%">
            </table>
        </div>
    </div>

    


</div>




<script type="text/javascript">
    $(function() {
        var oTable = $('#table-transaction').DataTable({
            "processing": true,
            "serverSide": true,
            "pageLength": 10, 
            "ajax": "{{ route('report.index') }}", 
            "columns": [
               
                {"data": 'tanggal_transaksi', name: 'tanggal_transaksi', title:'Tanggal Transaksi'},
                {"data": 'nama_produk', name: 'nama_produk', title:'Nama Produk'},
                {"data": 'jumlah_transaksi', name: 'jumlah_transaksi', title:'Jumlah Transaksi'},
                {"data": 'nik', name: 'nik', title:'NIK'}
            ],
            "columnDefs": [{
                "defaultContent": "-",
                "targets": "_all"
            }]
        });
    });
</script>

@endsection