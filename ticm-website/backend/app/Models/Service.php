<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
        'icon',
        'order_index',
        'is_active',
    ];
}
