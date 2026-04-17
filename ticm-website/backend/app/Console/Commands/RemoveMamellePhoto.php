<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Realization;

class RemoveMamellePhoto extends Command
{
    protected $signature = 'realization:remove-mamelle-photo';

    protected $description = 'Remove cover photo from Usine de Dessalement Les Mamelles';

    public function handle(): int
    {
        $realization = Realization::where('title', 'like', '%Dessalement Les Mamelles%')->first();

        if (!$realization) {
            $this->error('Realization not found');
            return Command::FAILURE;
        }

        $realization->update(['cover_image' => null]);
        $this->info('Photo removed from: ' . $realization->title);

        return Command::SUCCESS;
    }
}
