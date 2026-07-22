<?php

namespace Database\Seeders;

use App\Models\Airline;
use App\Models\Airport;
use App\Models\FlightClass;
use App\Models\FlightRoute;
use App\Models\FlightSchedule;
use App\Models\Seat;
use Illuminate\Database\Seeder;

class DemoFlightSeeder extends Seeder
{
    /**
     * Creates one sample flight (DAC -> CXB) with Economy/Business seats,
     * so you can test the booking flow end-to-end without typing data
     * manually every time.
     *
     * Run with: php artisan db:seed --class=DemoFlightSeeder
     */
    public function run(): void
    {
        $dac = Airport::firstOrCreate(
            ['code' => 'DAC'],
            ['name' => 'Hazrat Shahjalal International Airport', 'city' => 'Dhaka', 'country' => 'Bangladesh']
        );

        $cxb = Airport::firstOrCreate(
            ['code' => 'CXB'],
            ['name' => "Cox's Bazar Airport", 'city' => "Cox's Bazar", 'country' => 'Bangladesh']
        );

        $airline = Airline::firstOrCreate(
            ['code' => 'BS'],
            ['name' => 'US-Bangla Airlines']
        );

        $route = FlightRoute::firstOrCreate([
            'airline_id' => $airline->id,
            'origin_airport_id' => $dac->id,
            'destination_airport_id' => $cxb->id,
        ], [
            'distance_km' => 400,
        ]);

        $flight = FlightSchedule::firstOrCreate([
            'route_id' => $route->id,
            'flight_number' => 'BS-147',
        ], [
            'departure_date' => now()->addDays(7)->toDateString(),
            'departure_time' => '09:00:00',
            'arrival_time' => '10:00:00',
            'base_price' => 4500,
            'status' => 'scheduled',
        ]);

        $economy = FlightClass::firstOrCreate([
            'flight_schedule_id' => $flight->id,
            'name' => 'Economy',
        ], [
            'price' => 4500,
            'total_seats' => 10,
        ]);

        $business = FlightClass::firstOrCreate([
            'flight_schedule_id' => $flight->id,
            'name' => 'Business',
        ], [
            'price' => 9000,
            'total_seats' => 4,
        ]);

        // Economy seats: 1A - 10A
        for ($i = 1; $i <= 10; $i++) {
            Seat::firstOrCreate([
                'flight_schedule_id' => $flight->id,
                'seat_number' => $i . 'A',
            ], [
                'flight_class_id' => $economy->id,
                'is_booked' => false,
            ]);
        }

        // Business seats: 1B - 4B
        for ($i = 1; $i <= 4; $i++) {
            Seat::firstOrCreate([
                'flight_schedule_id' => $flight->id,
                'seat_number' => $i . 'B',
            ], [
                'flight_class_id' => $business->id,
                'is_booked' => false,
            ]);
        }
    }
}
