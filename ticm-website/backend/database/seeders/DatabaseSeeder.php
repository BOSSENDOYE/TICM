<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            AboutSeeder::class,
            ServiceSeeder::class,
            MaterialSeeder::class,
            CertificationSeeder::class,
            CommitmentSeeder::class,
            ReferenceSeeder::class,
            RealizationSeeder::class,
        ]);
    }
}
