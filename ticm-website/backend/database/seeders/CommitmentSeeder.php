<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommitmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('commitments')->delete();

        $commitments = [
            [
                'title'       => 'Qualité',
                'description' => "Plan qualité par chantier, traçabilité totale des matériaux et des procédés. Contrôles non-destructifs systématiques.",
                'icon'        => '✅',
            ],
            [
                'title'       => 'Sécurité HSE',
                'description' => "Zéro accident comme objectif absolu. Job Safety Analysis (JSA) systématique. Formation continue de tout le personnel.",
                'icon'        => '🛡️',
            ],
            [
                'title'       => 'Délais',
                'description' => "Reporting hebdomadaire d'avancement. Alertes proactives en cas de dérive. Engagement contractuel sur les échéances.",
                'icon'        => '⏱️',
            ],
            [
                'title'       => 'Client',
                'description' => "Interlocuteur dédié sur chaque projet. Support post-livraison et garantie complète. Flexibilité et réactivité permanente.",
                'icon'        => '🤝',
            ],
        ];

        foreach ($commitments as &$c) {
            $c['created_at'] = now();
            $c['updated_at'] = now();
        }

        DB::table('commitments')->insert($commitments);
    }
}
