<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'seat_id',
        'full_name',
        'passport_no',
        'date_of_birth',
        'gender',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }
}
