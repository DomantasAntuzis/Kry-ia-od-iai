<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CrosswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::middleware('auth:sanctum')->get('/register',[AuthController::class, 'register']);

//Route::middleware('auth:sanctum')->post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/main',[CrosswordController::class,'index']);
//Route::get('main',[CrosswordController::class,'index']);

Route::middleware(['auth:sanctum'])->group(function () {
Route::post('/logout', [LoginController::class, 'disconnect']);
Route::get('/create',[CrosswordController::class,'create']);
Route::post('/store',[CrosswordController::class,'store']);
Route::get('/show/{crossword}',[CrosswordController::class,'show']);
});
