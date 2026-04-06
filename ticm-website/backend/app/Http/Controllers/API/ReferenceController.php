<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Reference;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Reference::orderByDesc('id')->get()]);
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'client_name'  => 'required|string|max:190',
            'project_name' => 'required|string|max:190',
            'location'     => 'nullable|string|max:190',
            'period'       => 'nullable|string|max:50',
            'tag'          => 'nullable|string|max:100',
            'description'  => 'nullable|string',
            'image'        => 'nullable|string|max:255',
            'result'       => 'nullable|string|max:255',
            'category'     => 'nullable|string|max:120',
        ]);
        return response()->json(['data' => Reference::create($v)], 201);
    }

    public function update(Request $request, Reference $reference)
    {
        $v = $request->validate([
            'client_name'  => 'required|string|max:190',
            'project_name' => 'required|string|max:190',
            'location'     => 'nullable|string|max:190',
            'period'       => 'nullable|string|max:50',
            'tag'          => 'nullable|string|max:100',
            'description'  => 'nullable|string',
            'image'        => 'nullable|string|max:255',
            'result'       => 'nullable|string|max:255',
            'category'     => 'nullable|string|max:120',
        ]);
        $reference->update($v);
        return response()->json(['data' => $reference]);
    }

    public function destroy(Reference $reference)
    {
        $reference->delete();
        return response()->json([], 204);
    }
}
