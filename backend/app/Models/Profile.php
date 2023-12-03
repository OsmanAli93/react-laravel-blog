<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        "avatar",
        "username",
        "first_name",
        "last_name",
        "about",
        "background_cover",
        "country",
        "gender",
        "birthday"
    ];


    public function user ()
    {
        return $this->belongsTo(User::class);
    }
}
