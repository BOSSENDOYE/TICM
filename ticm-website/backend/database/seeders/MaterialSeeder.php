<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('materials')->delete();

        $materials = [
            ['name' => 'Acier noir',  'description' => 'Haute pression, charpentes, réservoirs',  'image' => null, 'url' => null],
            ['name' => 'Inox 316L',   'description' => 'Agroalimentaire, chimique, pharma',       'image' => null, 'url' => null],
            ['name' => 'PEHD PE100',  'description' => 'Eau, assainissement, gaz basse pression', 'image' => null, 'url' => null],
            ['name' => 'PVC',         'description' => 'Drainage, ventilation industrielle',      'image' => null, 'url' => null],
            ['name' => 'PPH',         'description' => 'Eau chaude, produits chimiques',          'image' => null, 'url' => null],
            ['name' => 'PRV / GRP',   'description' => 'Effluents, eau potable, milieux marins',  'image' => null, 'url' => null],
        ];

        foreach ($materials as &$m) {
            $m['created_at'] = now();
            $m['updated_at'] = now();
        }

        DB::table('materials')->insert($materials);
    }
}
