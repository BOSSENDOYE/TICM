<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('abouts')->delete();

        DB::table('abouts')->insert([
            'title'      => 'TICM — Touba International Construction Métallique',
            'subtitle'   => 'Solutions industrielles complètes en tuyauterie, chaudronnerie et charpente métallique au Sénégal et en Afrique de l\'Ouest.',
            'content'    => "Touba International Construction Métallique (TICM) est une entreprise sénégalaise spécialisée dans la réalisation d'ouvrages industriels de haute technicité.\n\nImplantée au Sénégal, TICM intervient sur des projets majeurs en Afrique de l'Ouest pour des opérateurs de renommée internationale dans les secteurs de l'énergie, du pétrole & gaz et de l'eau.\n\nNotre force : une équipe technique qualifiée, la maîtrise des normes les plus exigeantes et un engagement total sur la qualité, la sécurité et les délais.",
            'mission'    => "Fournir des solutions industrielles de haute qualité en tuyauterie, chaudronnerie et charpente métallique, en respectant les normes les plus exigeantes et en garantissant la sécurité de nos équipes et la satisfaction de nos clients.",
            'vision'     => "Devenir le leader de la construction métallique industrielle en Afrique de l'Ouest, reconnu pour notre excellence technique, notre fiabilité et notre capacité à intervenir sur les projets les plus ambitieux.",
            'values'     => "Qualité · Sécurité · Délais · Engagement client",
            'image'      => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
