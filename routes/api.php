<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CrosswordController;
use App\Http\Controllers\AdminController;

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

//non authorized routes
Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/main', [CrosswordController::class, 'index']);
Route::get('/show/{crossword}', [CrosswordController::class, 'show']);

//authorized routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [LoginController::class, 'disconnect']);
    Route::get('/create', [CrosswordController::class, 'create']);
    Route::post('/store', [CrosswordController::class, 'store']);
});

//admin routes
Route::middleware(['auth:sanctum', 'checkRole:admin'])->group(function () {
    Route::get('responding', [AdminController::class, 'waiting']);
    Route::put('confirm/{crossword}', [AdminController::class, 'confirm']);
    Route::prefix('admin')->get('preview/{crossword}', [AdminController::class, 'preview']);
    Route::post('remove/{crossword}', [AdminController::class, 'remove']);
});

