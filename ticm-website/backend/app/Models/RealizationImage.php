<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RealizationImage extends Model
{
    protected $fillable = ['realization_id', 'path', 'caption', 'order_index'];

    public function realization()
    {
        return $this->belongsTo(Realization::class);
    }
}
