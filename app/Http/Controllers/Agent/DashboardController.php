<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Agent/Dashboard', [
            'stats' => [
                'totalBookings' => Booking::count(),
                'pendingBookings' => Booking::where('status', 'pending')->count(),
            ],
            'recentBookings' => Booking::with(['user', 'flightSchedule'])
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }
}
