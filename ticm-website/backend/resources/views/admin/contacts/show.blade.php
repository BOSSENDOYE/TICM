@extends('admin.layout')

@section('title', 'Message reçu')

@section('content')
    <div class="card">
        <h2>Détails du message</h2>
        <p><strong>Nom :</strong> {{ $contact->fullname }}</p>
        <p><strong>Email :</strong> {{ $contact->email }}</p>
        <p><strong>Téléphone :</strong> {{ $contact->phone ?? 'N/A' }}</p>
        <p><strong>Statut :</strong> {{ ucfirst($contact->status) }}</p>
        <p><strong>Reçu :</strong> {{ $contact->created_at->format('d/m/Y H:i') }}</p>
        <div style="margin-top:1rem; padding:.9rem; background:#f9f9f9; border:1px solid #d8dbdc; border-radius:8px;">
            <strong>Message :</strong>
            <p style="white-space:pre-wrap;">{{ $contact->message }}</p>
        </div>

        <div style="margin-top:1rem; display:flex; gap:.6rem;">
            <a class="button button-secondary" href="{{ route('admin.contacts.index') }}">Retour</a>
            <form action="{{ route('admin.contacts.destroy', $contact) }}" method="POST">
                @csrf
                @method('DELETE')
                <button class="button button-danger" onclick="return confirm('Supprimer ce message ?')">Supprimer</button>
            </form>
        </div>
    </div>
@endsection