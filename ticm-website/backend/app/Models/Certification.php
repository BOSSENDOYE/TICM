<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Certification extends Model
{
    protected $fillable = ['code','title','category','issuer','date_obtained','expiration_date','certificate_file'];
}
