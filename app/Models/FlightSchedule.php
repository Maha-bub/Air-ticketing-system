<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'route_id',
        'flight_number',
        'departure_date',
        'departure_time',
        'arrival_time',
        'base_price',
        'status',
    ];

    public function route()
    {
        return $this->belongsTo(FlightRoute::class, 'route_id');
    }

    public function flightClasses()
    {
        return $this->hasMany(FlightClass::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // Convenience: how many seats are still free across all classes
    public function availableSeatsCount(): int
    {
        return $this->seats()->where('is_booked', false)->count();
    }
}
