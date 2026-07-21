<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_schedule_id',
        'name',
        'price',
        'total_seats',
    ];

    public function flightSchedule()
    {
        return $this->belongsTo(FlightSchedule::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
