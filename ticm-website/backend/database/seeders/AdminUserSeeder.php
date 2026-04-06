<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@ticm.com'],
            [
                'name'               => 'Administrateur TICM',
                'password'           => Hash::make('Admin123!@#'),
                'is_admin'           => true,
                'email_verified_at'  => now(),
            ]
        );
    }
}
