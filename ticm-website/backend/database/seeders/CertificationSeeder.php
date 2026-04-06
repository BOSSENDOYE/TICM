<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('certifications')->delete();

        $certifications = [
            [
                'code'             => 'ASME B31.3',
                'title'            => 'Process Piping',
                'category'         => 'Tuyauterie',
                'issuer'           => 'American Society of Mechanical Engineers',
                'date_obtained'    => null,
                'expiration_date'  => null,
                'certificate_file' => null,
            ],
            [
                'code'             => 'EN 13480',
                'title'            => 'Tuyauteries métalliques industrielles',
                'category'         => 'Tuyauterie',
                'issuer'           => 'Comité Européen de Normalisation',
                'date_obtained'    => null,
                'expiration_date'  => null,
                'certificate_file' => null,
            ],
            [
                'code'             => 'ISO 3834',
                'title'            => 'Exigences qualité en soudage',
                'category'         => 'Soudage',
                'issuer'           => 'Organisation Internationale de Normalisation',
                'date_obtained'    => null,
                'expiration_date'  => null,
                'certificate_file' => null,
            ],
            [
                'code'             => 'EN 1090',
                'title'            => 'Structures métalliques et aluminium',
                'category'         => 'Charpente',
                'issuer'           => 'Comité Européen de Normalisation',
                'date_obtained'    => null,
                'expiration_date'  => null,
                'certificate_file' => null,
            ],
            [
                'code'             => 'ISO 9001',
                'title'            => 'Management de la qualité',
                'category'         => 'Management',
                'issuer'           => 'Organisation Internationale de Normalisation',
                'date_obtained'    => null,
                'expiration_date'  => null,
                'certificate_file' => null,
            ],
            [
                'code'             => 'ISO 45001',
                'title'            => 'Santé & Sécurité au travail',
                'category'         => 'HSE',
                'issuer'           => 'Organisation Internationale de Normalisation',
                'date_obtained'    => null,
                'expiration_date'  => null,
                'certificate_file' => null,
            ],
        ];

        foreach ($certifications as &$c) {
            $c['created_at'] = now();
            $c['updated_at'] = now();
        }

        DB::table('certifications')->insert($certifications);
    }
}
