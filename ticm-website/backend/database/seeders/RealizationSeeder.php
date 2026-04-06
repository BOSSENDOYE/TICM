<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RealizationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('realization_images')->delete();
        DB::table('realizations')->delete();

        $realizations = [
            [
                'title'       => 'Usine de Dessalement Les Mamelles',
                'description' => "Réalisation complète des travaux de tuyauterie industrielle pour l'usine de dessalement d'eau de mer de grande capacité. Pose de réseaux haute pression, supports et instrumentation.",
                'comments'    => "Projet phare de l'infrastructure hydrique du Sénégal. Livré dans les délais contractuels.",
                'client'      => 'Eiffage',
                'location'    => 'Dakar, Sénégal',
                'period'      => '2024–2026',
                'category'    => 'Dessalement',
                'order_index' => 1,
                'is_active'   => true,
                'cover_image' => null,
            ],
            [
                'title'       => 'Plateforme Offshore GTA',
                'description' => "Fabrication et installation de structures de tuyauterie offshore pour la plateforme gazière Grand Tortue Ahmeyim, opération en milieu marin hostile.",
                'comments'    => "Intervention technique sur site offshore avec contraintes environnementales spécifiques.",
                'client'      => 'LAS',
                'location'    => 'Grand Tortue Ahmeyim',
                'period'      => '2023–2024',
                'category'    => 'Offshore',
                'order_index' => 2,
                'is_active'   => true,
                'cover_image' => null,
            ],
            [
                'title'       => 'STEP Baie de Hann',
                'description' => "Station d'épuration des eaux usées de la Baie de Hann. Travaux de tuyauterie, chaudronnerie et structures métalliques pour l'ensemble du génie civil.",
                'comments'    => "Projet environnemental majeur visant à dépolluer l'un des sites les plus sensibles du Sénégal.",
                'client'      => 'Suez',
                'location'    => 'Dakar, Sénégal',
                'period'      => '2023–2026',
                'category'    => 'Traitement des eaux',
                'order_index' => 3,
                'is_active'   => true,
                'cover_image' => null,
            ],
            [
                'title'       => 'Plateforme Sangomar',
                'description' => "Structures métalliques et tuyauteries pour la plateforme pétrolière Sangomar. Charpente, supports de tuyauteries et équipements mécano-soudés.",
                'comments'    => "Premier champ pétrolier offshore du Sénégal, livré avec les standards internationaux Oil & Gas.",
                'client'      => 'Orsen / Ortec',
                'location'    => 'Offshore Sénégal',
                'period'      => '2022–2024',
                'category'    => 'Pétrole & Gaz',
                'order_index' => 4,
                'is_active'   => true,
                'cover_image' => null,
            ],
            [
                'title'       => 'Centrale Électrique Malicounda',
                'description' => "Travaux de tuyauterie vapeur et eau pour la centrale thermique. Réseaux haute et basse pression, échangeurs et équipements de chaudronnerie.",
                'comments'    => "Centrale stratégique contribuant à l'autonomie énergétique nationale.",
                'client'      => 'LAS',
                'location'    => 'Malicounda, Sénégal',
                'period'      => '2020–2021',
                'category'    => 'Énergie',
                'order_index' => 5,
                'is_active'   => true,
                'cover_image' => null,
            ],
            [
                'title'       => 'Dépôt de Gaz Burkina Faso',
                'description' => "Construction d'un dépôt de stockage et de distribution de gaz. Réservoirs sous pression, tuyauteries et structures métalliques.",
                'comments'    => "Extension de nos activités à l'international, démontrant notre capacité opérationnelle régionale.",
                'client'      => 'China Harbour',
                'location'    => 'Burkina Faso',
                'period'      => '2021',
                'category'    => 'Gaz',
                'order_index' => 6,
                'is_active'   => true,
                'cover_image' => null,
            ],
        ];

        foreach ($realizations as &$r) {
            $r['slug']       = Str::slug($r['title']) . '-' . uniqid();
            $r['created_at'] = now();
            $r['updated_at'] = now();
        }

        DB::table('realizations')->insert($realizations);
    }
}
