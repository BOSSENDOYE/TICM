@extends('admin.layout')

@section('title', 'Modifier le service')

@section('content')
    <div class="card">
        <h2>Modifier le service</h2>
        @if($errors->any())
            <div class="flash" style="background: #ffefef; color:#6a1a1a; border-color:#e34343;">
                <ul style="margin:0; padding-left:1.2rem;">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.services.update', $service) }}" method="POST">
            @method('PUT')
            @include('admin.services.form')
        </form>
    </div>
@endsection