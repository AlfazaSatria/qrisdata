@extends('layouts.app')
@section('title', 'Report Data Monthly')
@section('content')

<div class="container">
   
    <div class="card-header">
        <h4>Transaksi QRIS per Bulan pada Tahun 2023</h4>

    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Total Transaksi</th>
                    <th>Total Jumlah Transaksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($transactions as $transaction)
                    <tr>
                        <td>{{ date('F', mktime(0, 0, 0, $transaction->month, 10)) }}</td>
                        <td>{{ $transaction->total_transactions }}</td>
                        <td>Rp. {{ number_format($transaction->total_amount, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>





@endsection