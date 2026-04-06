<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Material::orderBy('id')->get()]);
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'name'        => 'required|string|max:190',
            'description' => 'nullable|string',
            'image'       => 'nullable|string|max:255',
            'url'         => 'nullable|string|max:255',
        ]);
        return response()->json(['data' => Material::create($v)], 201);
    }

    public function update(Request $request, Material $material)
    {
        $v = $request->validate([
            'name'        => 'required|string|max:190',
            'description' => 'nullable|string',
            'image'       => 'nullable|string|max:255',
            'url'         => 'nullable|string|max:255',
        ]);
        $material->update($v);
        return response()->json(['data' => $material]);
    }

    public function destroy(Material $material)
    {
        $material->delete();
        return response()->json([], 204);
    }
}
