@extends('admin.layout')

@section('title', 'Contacts')

@section('content')
    <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.7rem;">
            <h2>Messages reçus</h2>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Statut</th>
                    <th>Reçu</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($contacts as $contact)
                    <tr>
                        <td>{{ $contact->fullname }}</td>
                        <td>{{ $contact->email }}</td>
                        <td>{{ $contact->phone ?? '-' }}</td>
                        <td><span class="badge">{{ ucfirst($contact->status) }}</span></td>
                        <td>{{ $contact->created_at->format('d/m/Y H:i') }}</td>
                        <td style="display:flex; gap:.35rem; flex-wrap:wrap;">
                            <a class="button button-secondary" href="{{ route('admin.contacts.show', $contact) }}">Voir</a>
                            <form action="{{ route('admin.contacts.destroy', $contact) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="button button-danger" onclick="return confirm('Supprimer le message ?')">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div style="margin-top:1rem;">{{ $contacts->links() }}</div>
    </div>
@endsection