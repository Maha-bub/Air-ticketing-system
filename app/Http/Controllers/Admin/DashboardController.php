<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\FlightSchedule;
use App\Models\Payment;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalFlights' => FlightSchedule::count(),
                'totalBookings' => Booking::count(),
                'confirmedBookings' => Booking::where('status', 'confirmed')->count(),
                'totalCustomers' => User::role('customer')->count(),
                'totalRevenue' => (float) Payment::where('status', 'success')->sum('amount'),
            ],
            'recentBookings' => Booking::with([
                'user',
                'flightSchedule.route.originAirport',
                'flightSchedule.route.destinationAirport',
            ])
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
