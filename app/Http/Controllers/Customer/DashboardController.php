<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()
            ->bookings()
            ->with([
                'flightSchedule.route.originAirport',
                'flightSchedule.route.destinationAirport',
                'payment',
            ])
            ->latest()
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'bookings' => $bookings,
        ]);
    }
}
