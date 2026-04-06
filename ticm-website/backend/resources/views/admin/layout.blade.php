<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title', 'Admin') - TICM</title>
    <style>
        :root {
            --color-dark: #475250;
            --color-gold: #C4B549;
            --color-light: #f6f7f8;
            --color-mid: #7f8a8b;
            --color-white: #ffffff;
        }

        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--color-light); color: var(--color-dark); }
        a { text-decoration: none; color: inherit; }

        .frame {
            display: grid;
            grid-template-columns: 250px 1fr;
            min-height: 100vh;
        }

        .sidebar {
            background: linear-gradient(180deg, var(--color-dark), #364041);
            color: var(--color-white);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .sidebar h1 { font-size: 1.35rem; margin: 0; color: var(--color-gold); }
        .sidebar .nav-link { display: block; padding: 0.68rem 0.75rem; border-radius: 8px; color: #e9ecef; }
        .sidebar .nav-link:hover { background: rgba(196, 181, 73, 0.2); color: var(--color-white); }

        .content {
            background: var(--color-light);
            padding: 1.5rem;
            color: var(--color-dark);
        }

        .card { background: var(--color-white); border-radius: 14px; box-shadow: 0 8px 23px rgba(0,0,0,.05); padding: 1.3rem; margin-bottom: 1rem; }

        h2, h3 { margin: 0 0 0.75rem; }
        .badge { display: inline-block; padding: 0.25rem 0.55rem; border-radius: 999px; font-size: 0.7rem; color: var(--color-white); background: var(--color-dark);}        

        .flash { margin-bottom: 12px; padding: 0.85rem 1rem; border-left: 4px solid var(--color-gold); background: #fffdf1; color: #4f4a2b; }

        .table { width: 100%; border-collapse: collapse; }
        .table th,
        .table td { padding: 0.65rem 0.75rem; border-bottom: 1px solid #dde0e1; }
        .table th { text-align: left; font-size: 0.8rem; color: var(--color-mid); text-transform: uppercase; letter-spacing: 0.05em; }

        .button { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.48rem 0.75rem; border-radius: 8px; font-size: 0.9rem; letter-spacing: .01rem; border: none; cursor: pointer; }
        .button-primary { background: var(--color-dark); color: #ffffff; }
        .button-secondary { background: var(--color-gold); color: #20302e; }
        .button-danger { background: #d94c4c; color: #fff; }

        .form-group { margin-bottom: 0.8rem; }
        .form-group label { display: block; margin-bottom: 0.28rem; font-weight: 600; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; border: 1px solid #cfd6d7; border-radius: 8px; padding: 0.55rem; }
        .form-group textarea { resize: vertical; min-height: 120px; }

        @media (max-width: 900px) {
            .frame { grid-template-columns: 1fr; }
            .sidebar { flex-direction: row; overflow-x: auto; justify-content: space-around; }
        }
    </style>
</head>
<body>
    <div class="frame">
        <aside class="sidebar">
            <h1>TICM Admin</h1>
            <a href="{{ route('admin.dashboard') }}" class="nav-link">Tableau de bord</a>
            <a href="{{ route('admin.services.index') }}" class="nav-link">Services</a>
            <a href="{{ route('admin.contacts.index') }}" class="nav-link">Contacts</a>
            <a href="#" class="nav-link" style="opacity: .6; cursor: default;">Autres modules (à étendre)</a>
        </aside>

        <main class="content">
            @if(session('success'))
                <div class="flash">{{ session('success') }}</div>
            @endif
            @yield('content')
        </main>
    </div>
</body>
</html>
