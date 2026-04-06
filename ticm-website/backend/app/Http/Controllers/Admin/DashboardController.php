<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $counts = [
            'services' => \App\Models\Service::count(),
            'materials' => \App\Models\Material::count(),
            'references' => \App\Models\Reference::count(),
            'certifications' => \App\Models\Certification::count(),
            'commitments' => \App\Models\Commitment::count(),
            'abouts' => \App\Models\About::count(),
            'contacts' => \App\Models\Contact::count(),
        ];

        return view('admin.dashboard', compact('counts'));
    }
}
