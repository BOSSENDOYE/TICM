<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReferenceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('references')->delete();

        $references = [
            [
                'client_name'  => 'Eiffage',
                'project_name' => 'Usine de Dessalement Les Mamelles',
                'location'     => 'Dakar, Sénégal',
                'period'       => '2024–2026',
                'tag'          => 'Dessalement',
                'category'     => 'Traitement de l\'eau',
                'description'  => 'Réalisation complète des travaux de tuyauterie industrielle pour l\'usine de dessalement d\'eau de mer de grande capacité.',
                'result'       => 'Infrastructure hydrique majeure du Sénégal',
                'image'        => null,
            ],
            [
                'client_name'  => 'Suez',
                'project_name' => 'STEP Baie de Hann',
                'location'     => 'Dakar, Sénégal',
                'period'       => '2023–2026',
                'tag'          => 'Traitement eaux',
                'category'     => 'Environnement',
                'description'  => 'Station d\'épuration des eaux usées de la Baie de Hann. Tuyauterie, chaudronnerie et structures métalliques.',
                'result'       => 'Dépollution d\'un site sensible du Sénégal',
                'image'        => null,
            ],
            [
                'client_name'  => 'LAS',
                'project_name' => 'Plateforme Offshore GTA',
                'location'     => 'Grand Tortue Ahmeyim',
                'period'       => '2023–2024',
                'tag'          => 'Offshore',
                'category'     => 'Oil & Gas',
                'description'  => 'Fabrication et installation de structures de tuyauterie offshore pour la plateforme gazière Grand Tortue Ahmeyim.',
                'result'       => 'Intervention réussie en milieu marin hostile',
                'image'        => null,
            ],
            [
                'client_name'  => 'Orsen / Ortec',
                'project_name' => 'Plateforme Sangomar',
                'location'     => 'Offshore Sénégal',
                'period'       => '2022–2024',
                'tag'          => 'Pétrole & Gaz',
                'category'     => 'Oil & Gas',
                'description'  => 'Structures métalliques et tuyauteries pour la plateforme pétrolière Sangomar. Premier champ pétrolier offshore du Sénégal.',
                'result'       => 'Livré aux standards internationaux Oil & Gas',
                'image'        => null,
            ],
            [
                'client_name'  => 'LAS',
                'project_name' => 'Dépôt hydrocarbures Sendou',
                'location'     => 'Projet ELTON',
                'period'       => '2022–2023',
                'tag'          => 'Hydrocarbures',
                'category'     => 'Énergie',
                'description'  => 'Construction d\'un dépôt de stockage d\'hydrocarbures. Réservoirs, tuyauteries et structures métalliques.',
                'result'       => 'Capacité de stockage augmentée',
                'image'        => null,
            ],
            [
                'client_name'  => 'LAS',
                'project_name' => 'Centrale Électrique Malicounda',
                'location'     => 'Malicounda, Sénégal',
                'period'       => '2020–2021',
                'tag'          => 'Énergie',
                'category'     => 'Énergie',
                'description'  => 'Travaux de tuyauterie vapeur et eau pour la centrale thermique. Réseaux haute et basse pression, échangeurs.',
                'result'       => 'Centrale contribuant à l\'autonomie énergétique nationale',
                'image'        => null,
            ],
            [
                'client_name'  => 'China Harbour',
                'project_name' => 'Dépôt de Gaz',
                'location'     => 'Burkina Faso',
                'period'       => '2021',
                'tag'          => 'Gaz',
                'category'     => 'Gaz',
                'description'  => 'Construction d\'un dépôt de stockage et de distribution de gaz. Réservoirs sous pression, tuyauteries et structures métalliques.',
                'result'       => 'Première intervention internationale de TICM',
                'image'        => null,
            ],
            [
                'client_name'  => 'Suez',
                'project_name' => 'Usine eau KMS',
                'location'     => 'Keur Momar Sarr',
                'period'       => '2018–2020',
                'tag'          => 'Eau potable',
                'category'     => 'Traitement de l\'eau',
                'description'  => 'Usine de production d\'eau potable de Keur Momar Sarr. Travaux de tuyauterie et équipements mécano-soudés.',
                'result'       => 'Production d\'eau potable pour des milliers de foyers',
                'image'        => null,
            ],
        ];

        foreach ($references as &$r) {
            $r['created_at'] = now();
            $r['updated_at'] = now();
        }

        DB::table('references')->insert($references);
    }
}
