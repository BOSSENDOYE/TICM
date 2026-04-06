<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AllowCors
{
    public function handle(Request $request, Closure $next)
    {
        $allowed = [
            'https://www.ticmgroupe.com',
            'https://ticmgroupe.com',
            'http://localhost:5173',
            'http://localhost:5174',
        ];

        $origin = $request->headers->get('Origin');
        $originHeader = in_array($origin, $allowed) ? $origin : $allowed[0];

        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->header('Access-Control-Allow-Origin',  $originHeader)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With')
                ->header('Access-Control-Max-Age',       '86400');
        }

        $response = $next($request);

        return $response
            ->header('Access-Control-Allow-Origin',  $originHeader)
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
    }
}
