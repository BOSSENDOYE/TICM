<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json([ 'data' => Contact::latest()->paginate(15) ]);
    }

    public function show(Contact $contact)
    {
        return response()->json([ 'data' => $contact ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname' => 'required|string|max:150',
            'email' => 'required|email|max:190',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string',
        ]);

        $validated['status'] = 'new';

        $contact = Contact::create($validated);

        return response()->json([ 'data' => $contact ], 201);
    }

    public function updateStatus(Request $request, Contact $contact)
    {
        $request->validate(['status' => 'required|in:new,read,processed']);
        $contact->update(['status' => $request->status]);
        return response()->json(['data' => $contact]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json([], 204);
    }
}
