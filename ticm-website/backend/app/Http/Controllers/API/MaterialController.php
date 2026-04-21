<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'image'       => 'nullable|file|max:10240|mimes:jpg,jpeg,png,gif,webp',
            'url'         => 'nullable|string|max:255',
        ]);

        $data = [
            'name' => $v['name'],
            'description' => $v['description'] ?? null,
            'url' => $v['url'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('materials', 'public');
            $data['image'] = '/storage/' . $path;
        }

        return response()->json(['data' => Material::create($data)], 201);
    }

    public function update(Request $request, Material $material)
    {
        $v = $request->validate([
            'name'        => 'sometimes|string|max:190',
            'description' => 'nullable|string',
            'image'       => 'nullable|file|max:10240|mimes:jpg,jpeg,png,gif,webp',
            'url'         => 'nullable|string|max:255',
        ]);

        $data = [];

        if (isset($v['name'])) {
            $data['name'] = $v['name'];
        }
        if (isset($v['description'])) {
            $data['description'] = $v['description'];
        }
        if (isset($v['url'])) {
            $data['url'] = $v['url'];
        }

        if ($request->hasFile('image')) {
            if ($material->image) {
                $oldPath = str_replace('/storage/', '', $material->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('materials', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $material->update($data);
        return response()->json(['data' => $material]);
    }

    public function destroy(Material $material)
    {
        if ($material->image) {
            $path = str_replace('/storage/', '', $material->image);
            Storage::disk('public')->delete($path);
        }
        $material->delete();
        return response()->json([], 204);
    }
}
