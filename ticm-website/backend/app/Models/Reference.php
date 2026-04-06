<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Reference extends Model
{
    protected $fillable = ['client_name','project_name','location','period','tag','description','image','result','category'];
}
