<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Crossword extends Eloquent
{
    use HasFactory;
    protected $fillable = [
        'name',
        'difficulty',
        'words',
        'confirmed',
        'grid',
        'user_id',
    ];
    protected $connection = 'mongodb';
    protected $collection = 'crosswords';
}
