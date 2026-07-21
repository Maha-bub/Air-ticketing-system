<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightRoute extends Model
{
    use HasFactory;

    // Table name is 'routes' but the class is named FlightRoute so it never
    // clashes with Illuminate\Support\Facades\Route.
    protected $table = 'routes';

    protected $fillable = [
        'airline_id',
        'origin_airport_id',
        'destination_airport_id',
        'distance_km',
    ];

    public function airline()
    {
        return $this->belongsTo(Airline::class);
    }

    public function originAirport()
    {
        return $this->belongsTo(Airport::class, 'origin_airport_id');
    }

    public function destinationAirport()
    {
        return $this->belongsTo(Airport::class, 'destination_airport_id');
    }

    public function flightSchedules()
    {
        return $this->hasMany(FlightSchedule::class, 'route_id');
    }
}
