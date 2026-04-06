<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json([ 'data' => Service::where('is_active', true)->orderBy('order_index')->get() ]);
    }

    public function show(Service $service)
    {
        return response()->json([ 'data' => $service ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:190',
            'slug' => 'required|string|max:220|unique:services,slug',
            'summary' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'order_index' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = $validated['order_index'] ?? 1;

        $service = Service::create($validated);

        return response()->json([ 'data' => $service ], 201);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:190',
            'slug' => 'required|string|max:220|unique:services,slug,' . $service->id,
            'summary' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'order_index' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = $validated['order_index'] ?? $service->order_index;

        $service->update($validated);

        return response()->json([ 'data' => $service ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json([], 204);
    }
}
