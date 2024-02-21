<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});


Route::post('/auth', [App\Http\Controllers\Auth\LoginController::class, 'validateLogin'])->name('login.auth');
Route::get('/register',[App\Http\Controllers\Auth\RegisterController::class, 'showRegistrationForm'])->name("register.view");
Route::post('/register/submit', [App\Http\Controllers\Auth\RegisterController::class,'validateRegister'])->name("register.auth");

Auth::routes();


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/index/report', [App\Http\Controllers\TransactionController::class, 'dataTransaction'])->name('report.index');
Route::get('/transaction-qris', [App\Http\Controllers\TransactionController::class, 'dataTransactionMonthly'])->name('transactionqris.monthly');





