<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Realization;
use App\Models\RealizationImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RealizationController extends Controller
{
    public function index()
    {
        $data = Realization::with('images')
            ->where('is_active', true)
            ->orderBy('order_index')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'comments'    => 'nullable|string',
            'cover_image' => 'nullable|string',
            'client'      => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
            'period'      => 'nullable|string|max:100',
            'category'    => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();

        $item = Realization::create($validated);
        return response()->json($item->load('images'), 201);
    }

    public function show(string $id)
    {
        $item = Realization::with('images')->findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, string $id)
    {
        $item = Realization::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'comments'    => 'nullable|string',
            'cover_image' => 'nullable|string',
            'client'      => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
            'period'      => 'nullable|string|max:100',
            'category'    => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);

        $item->update($validated);
        return response()->json($item->load('images'));
    }

    public function destroy(string $id)
    {
        Realization::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function addImage(Request $request, string $id)
    {
        $realization = Realization::findOrFail($id);

        $request->validate([
            'path'        => 'required|string',
            'caption'     => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
        ]);

        $image = $realization->images()->create([
            'path'        => $request->path,
            'caption'     => $request->caption,
            'order_index' => $request->order_index ?? 0,
        ]);

        return response()->json($image, 201);
    }

    public function removeImage(string $id, string $imageId)
    {
        $image = RealizationImage::where('realization_id', $id)->findOrFail($imageId);
        $image->delete();
        return response()->json(null, 204);
    }
}
