<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Certification::orderBy('id')->get()]);
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'code'            => 'nullable|string|max:60',
            'title'           => 'required|string|max:190',
            'category'        => 'nullable|string|max:120',
            'issuer'          => 'nullable|string|max:150',
            'date_obtained'   => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'certificate_file'=> 'nullable|string|max:255',
        ]);
        return response()->json(['data' => Certification::create($v)], 201);
    }

    public function update(Request $request, Certification $certification)
    {
        $v = $request->validate([
            'code'            => 'nullable|string|max:60',
            'title'           => 'required|string|max:190',
            'category'        => 'nullable|string|max:120',
            'issuer'          => 'nullable|string|max:150',
            'date_obtained'   => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'certificate_file'=> 'nullable|string|max:255',
        ]);
        $certification->update($v);
        return response()->json(['data' => $certification]);
    }

    public function destroy(Certification $certification)
    {
        $certification->delete();
        return response()->json([], 204);
    }
}
