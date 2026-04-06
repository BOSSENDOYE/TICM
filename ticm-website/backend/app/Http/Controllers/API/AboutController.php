<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function show()
    {
        $about = About::first();
        return response()->json(['data' => $about]);
    }

    public function upsert(Request $request)
    {
        $v = $request->validate([
            'title'    => 'nullable|string|max:190',
            'subtitle' => 'nullable|string|max:255',
            'content'  => 'nullable|string',
            'image'    => 'nullable|string|max:255',
            'mission'  => 'nullable|string',
            'vision'   => 'nullable|string',
            'values'   => 'nullable|string',
        ]);

        $about = About::first();
        if ($about) {
            $about->update($v);
        } else {
            $about = About::create($v);
        }
        return response()->json(['data' => $about]);
    }
}
