@extends('admin.layout')

@section('title', 'Services')

@section('content')
    <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap:.7rem;">
            <h2>Services</h2>
            <a href="{{ route('admin.services.create') }}" class="button button-secondary">Nouveau service</a>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Ordre</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($services as $service)
                    <tr>
                        <td>{{ $service->title }}</td>
                        <td>{{ $service->slug }}</td>
                        <td><span class="badge">{{ $service->is_active ? 'Actif' : 'Inactif' }}</span></td>
                        <td>{{ $service->order_index }}</td>
                        <td style="display:flex; gap:.35rem;">
                            <a class="button button-secondary" href="{{ route('admin.services.edit', $service) }}">Éditer</a>
                            <form action="{{ route('admin.services.destroy', $service) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="button button-danger" onclick="return confirm('Supprimer ce service ?')">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection