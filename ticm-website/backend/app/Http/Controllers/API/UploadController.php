<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240|mimes:jpg,jpeg,png,gif,webp,pdf,svg',
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        return response()->json(['url' => '/storage/' . $path]);
    }
}
