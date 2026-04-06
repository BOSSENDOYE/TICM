<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{
    AuthController, ContactController, ServiceController,
    MaterialController, CertificationController, CommitmentController,
    AboutController, ReferenceController, UploadController
};
use App\Http\Controllers\Api\RealizationController;

// ── Auth public ──
Route::post('/auth/login', [AuthController::class, 'login']);

// ── Public GET (used by showcase) ──
Route::get('services',           [ServiceController::class,       'index']);
Route::get('services/{service}', [ServiceController::class,       'show']);
Route::get('materials',          [MaterialController::class,      'index']);
Route::get('certifications',     [CertificationController::class, 'index']);
Route::get('commitments',        [CommitmentController::class,    'index']);
Route::get('about',              [AboutController::class,         'show']);
Route::get('references',         [ReferenceController::class,     'index']);
Route::get('realizations',       [RealizationController::class,   'index']);
Route::get('realizations/{id}',  [RealizationController::class,   'show']);

// ── Public POST (contact form on showcase) ──
Route::post('contacts', [ContactController::class, 'store']);

// ── Protected (admin only) ──
Route::middleware('auth:sanctum')->group(function () {

    // File upload
    Route::post('upload', [UploadController::class, 'store']);

    // Auth
    Route::post('/auth/logout',   [AuthController::class, 'logout']);
    Route::get('/auth/me',        [AuthController::class, 'me']);
    Route::post('/auth/register', [AuthController::class, 'createAdmin']);

    // Stats dashboard
    Route::get('admin/stats', function () {
        return response()->json([
            'contacts'       => \App\Models\Contact::count(),
            'contacts_new'   => \App\Models\Contact::where('status', 'new')->count(),
            'services'       => \App\Models\Service::count(),
            'realisations'   => \App\Models\Realization::count(),
            'references'     => \App\Models\Reference::count(),
            'certifications' => \App\Models\Certification::count(),
            'materials'      => \App\Models\Material::count(),
            'commitments'    => \App\Models\Commitment::count(),
        ]);
    });

    // Contacts management
    Route::get('contacts',                    [ContactController::class, 'index']);
    Route::get('contacts/{contact}',          [ContactController::class, 'show']);
    Route::patch('contacts/{contact}/status', [ContactController::class, 'updateStatus']);
    Route::delete('contacts/{contact}',       [ContactController::class, 'destroy']);

    // Services CRUD
    Route::post('services',             [ServiceController::class, 'store']);
    Route::put('services/{service}',    [ServiceController::class, 'update']);
    Route::delete('services/{service}', [ServiceController::class, 'destroy']);

    // Materials CRUD
    Route::post('materials',              [MaterialController::class, 'store']);
    Route::put('materials/{material}',    [MaterialController::class, 'update']);
    Route::delete('materials/{material}', [MaterialController::class, 'destroy']);

    // Certifications CRUD
    Route::post('certifications',                   [CertificationController::class, 'store']);
    Route::put('certifications/{certification}',    [CertificationController::class, 'update']);
    Route::delete('certifications/{certification}', [CertificationController::class, 'destroy']);

    // Commitments CRUD
    Route::post('commitments',                [CommitmentController::class, 'store']);
    Route::put('commitments/{commitment}',    [CommitmentController::class, 'update']);
    Route::delete('commitments/{commitment}', [CommitmentController::class, 'destroy']);

    // References CRUD
    Route::post('references',              [ReferenceController::class, 'store']);
    Route::put('references/{reference}',   [ReferenceController::class, 'update']);
    Route::delete('references/{reference}',[ReferenceController::class, 'destroy']);

    // About (singleton)
    Route::post('about', [AboutController::class, 'upsert']);
    Route::put('about',  [AboutController::class, 'upsert']);

    // Réalisations CRUD
    Route::post('realizations',                             [RealizationController::class, 'store']);
    Route::put('realizations/{id}',                         [RealizationController::class, 'update']);
    Route::delete('realizations/{id}',                      [RealizationController::class, 'destroy']);
    Route::post('realizations/{id}/images',                 [RealizationController::class, 'addImage']);
    Route::delete('realizations/{id}/images/{imageId}',     [RealizationController::class, 'removeImage']);
});
