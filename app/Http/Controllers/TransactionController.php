<?php

namespace App\Http\Controllers;

use App\Models\Transactionqris;
use Illuminate\Http\Request;
use DataTables;
use Exception;
use DB;

class TransactionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function dataTransaction()
    {
        if (request()->ajax()) {
            $query = Transactionqris::query(); 
            return DataTables::eloquent($query)
                ->addIndexColumn()
                ->toJson();
        }
        return view('admin.reportindex', ['title' => 'Data QRIS']);
    }

    public function dataTransactionMonthly()
    {
        $transactions = Transactionqris::select(
            DB::raw('MONTH(tanggal_transaksi) as month'),
            DB::raw('YEAR(tanggal_transaksi) as year'),
            DB::raw('COUNT(*) as total_transactions'), // Hitung total transaksi
            DB::raw('SUM(jumlah_transaksi) as total_amount') // Menambahkan jumlah total transaksi
        )
        ->whereYear('tanggal_transaksi', 2023)
        ->groupBy('month', 'year')
        ->orderBy('month', 'asc')
        ->get();

        return view('admin.reportmonthly')->with('transactions', $transactions);
    }
}
