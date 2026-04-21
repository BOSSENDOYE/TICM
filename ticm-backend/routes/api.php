<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MaterialController;

// Public routes
Route::get('/materials', [MaterialController::class, 'index']);

// Auth routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('materials', MaterialController::class)->except(['index']);
    Route::get('/admin/stats', function () {
        return response()->json([
            'contacts'       => 0,
            'contacts_new'   => 0,
            'services'       => 0,
            'references'     => 0,
            'certifications' => 0,
            'materials'      => \App\Models\Material::count(),
            'commitments'    => 0,
        ]);
    });
});
