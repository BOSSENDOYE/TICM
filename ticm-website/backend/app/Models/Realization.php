<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Realization extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'comments', 'cover_image',
        'client', 'location', 'period', 'category',
        'order_index', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean'];

    public function images()
    {
        return $this->hasMany(RealizationImage::class)->orderBy('order_index');
    }
}
