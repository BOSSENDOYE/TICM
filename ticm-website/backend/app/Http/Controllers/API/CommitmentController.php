<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Commitment;
use Illuminate\Http\Request;

class CommitmentController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Commitment::orderBy('id')->get()]);
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'title'       => 'required|string|max:190',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:100',
        ]);
        return response()->json(['data' => Commitment::create($v)], 201);
    }

    public function update(Request $request, Commitment $commitment)
    {
        $v = $request->validate([
            'title'       => 'required|string|max:190',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:100',
        ]);
        $commitment->update($v);
        return response()->json(['data' => $commitment]);
    }

    public function destroy(Commitment $commitment)
    {
        $commitment->delete();
        return response()->json([], 204);
    }
}
