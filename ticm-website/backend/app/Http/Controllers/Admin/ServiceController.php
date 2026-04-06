<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = \App\Models\Service::orderBy('order_index')->get();
        return view('admin.services.index', compact('services'));
    }

    public function create()
    {
        return view('admin.services.create');
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

        \App\Models\Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service créé avec succès.');
    }

    public function edit(\App\Models\Service $service)
    {
        return view('admin.services.edit', compact('service'));
    }

    public function update(Request $request, \App\Models\Service $service)
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
        $validated['order_index'] = $validated['order_index'] ?? 1;

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service mis à jour.');
    }

    public function destroy(\App\Models\Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service supprimé.');
    }
}
