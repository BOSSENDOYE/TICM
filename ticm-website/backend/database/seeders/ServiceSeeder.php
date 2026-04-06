<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('services')->delete();

        $services = [
            [
                'title'       => 'Tuyauterie Industrielle',
                'slug'        => 'tuyauterie-industrielle',
                'summary'     => 'Réseaux haute & basse pression',
                'content'     => "Soudage TIG / MIG / MAG\nHaute & basse pression\nFluides industriels\nAs-built & traçabilité",
                'icon'        => 'pipe',
                'order_index' => 1,
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Chaudronnerie',
                'slug'        => 'chaudronnerie',
                'summary'     => 'Réservoirs & équipements soudés',
                'content'     => "Réservoirs sur mesure\nÉchangeurs thermiques\nÉquipements ATEX\nContrôle qualité intégral",
                'icon'        => 'cog',
                'order_index' => 2,
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Charpente Métallique',
                'slug'        => 'charpente-metallique',
                'summary'     => 'Structures industrielles',
                'content'     => "Structures EN 1090 EXC3\nHangars industriels\nPlateformes & passerelles\nMontage sur site",
                'icon'        => 'building',
                'order_index' => 3,
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        DB::table('services')->insert($services);
    }
}
