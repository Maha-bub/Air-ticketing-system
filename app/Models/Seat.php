<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_schedule_id',
        'flight_class_id',
        'seat_number',
        'is_booked',
    ];

    protected $casts = [
        'is_booked' => 'boolean',
    ];

    public function flightSchedule()
    {
        return $this->belongsTo(FlightSchedule::class);
    }

    public function flightClass()
    {
        return $this->belongsTo(FlightClass::class);
    }

    public function passenger()
    {
        return $this->hasOne(Passenger::class);
    }
}
