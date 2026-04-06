@extends('admin.layout')

@section('title', 'Tableau de bord')

@section('content')
    <div class="card">
        <h2>Tableau de bord</h2>
        <p>Bienvenue dans le backoffice TICM. Vue synthétique des éléments clés de la plateforme.</p>
    </div>

    <div class="card">
        <h3>Statistiques</h3>

        <div style="display:grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap:0.8rem;">
            @foreach($counts as $item => $value)
                <div style="background:#fff; border-radius:10px; padding:0.9rem; box-shadow: 0 8px 15px rgba(71,82,80,.06);">
                    <h4 style="margin:.1rem 0 .5rem; text-transform: capitalize;">{{ str_replace('_', ' ', $item) }}</h4>
                    <p style="font-size:1.8rem; font-weight:700; color: var(--color-dark);">{{ $value }}</p>
                </div>
            @endforeach
        </div>
    </div>
@endsection