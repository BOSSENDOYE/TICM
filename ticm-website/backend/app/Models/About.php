<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'content',
        'image',
        'mission',
        'vision',
        'values',
    ];
}
