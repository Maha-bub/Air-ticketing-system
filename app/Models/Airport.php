<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code', 'city', 'country'];

    public function originRoutes()
    {
        return $this->hasMany(FlightRoute::class, 'origin_airport_id');
    }

    public function destinationRoutes()
    {
        return $this->hasMany(FlightRoute::class, 'destination_airport_id');
    }
}
