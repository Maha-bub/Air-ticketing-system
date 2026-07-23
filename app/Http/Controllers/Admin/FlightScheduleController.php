<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FlightClass;
use App\Models\FlightRoute;
use App\Models\FlightSchedule;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FlightScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/FlightSchedules/Index', [
            'flightSchedules' => FlightSchedule::with([
                'route.airline',
                'route.originAirport',
                'route.destinationAirport',
            ])
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/FlightSchedules/Create', [
            'routes' => FlightRoute::with(['airline', 'originAirport', 'destinationAirport'])->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'route_id' => ['required', 'exists:routes,id'],
            'flight_number' => ['required', 'string', 'max:50'],
            'departure_date' => ['required', 'date'],
            'departure_time' => ['required'],
            'arrival_time' => ['required'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:scheduled,delayed,cancelled,completed'],
            'classes' => ['required', 'array', 'min:1'],
            'classes.*.name' => ['required', 'string', 'max:50'],
            'classes.*.price' => ['required', 'numeric', 'min:0'],
            'classes.*.total_seats' => ['required', 'integer', 'min:1', 'max:200'],
        ]);

        DB::transaction(function () use ($validated) {
            $flight = FlightSchedule::create([
                'route_id' => $validated['route_id'],
                'flight_number' => $validated['flight_number'],
                'departure_date' => $validated['departure_date'],
                'departure_time' => $validated['departure_time'],
                'arrival_time' => $validated['arrival_time'],
                'base_price' => $validated['base_price'],
                'status' => $validated['status'],
            ]);

            foreach ($validated['classes'] as $classData) {
                $flightClass = FlightClass::create([
                    'flight_schedule_id' => $flight->id,
                    'name' => $classData['name'],
                    'price' => $classData['price'],
                    'total_seats' => $classData['total_seats'],
                ]);

                // Seat numbering: 1E, 2E... for Economy, 1B, 2B... for Business, etc.
                $suffix = strtoupper(substr($classData['name'], 0, 1));

                for ($i = 1; $i <= $classData['total_seats']; $i++) {
                    Seat::create([
                        'flight_schedule_id' => $flight->id,
                        'flight_class_id' => $flightClass->id,
                        'seat_number' => $i . $suffix,
                        'is_booked' => false,
                    ]);
                }
            }
        });

        return redirect()->route('admin.flight-schedules.index')->with('success', 'Flight schedule created successfully.');
    }

    public function edit(FlightSchedule $flightSchedule)
    {
        return Inertia::render('Admin/FlightSchedules/Edit', [
            'flightSchedule' => $flightSchedule->load('flightClasses'),
            'routes' => FlightRoute::with(['airline', 'originAirport', 'destinationAirport'])->get(),
        ]);
    }

    public function update(Request $request, FlightSchedule $flightSchedule)
    {
        // Note: this only updates the flight's own fields. Flight classes / seat
        // counts are not editable here yet — changing seat counts after seats may
        // already be booked needs its own safe migration logic (a later phase).
        $validated = $request->validate([
            'route_id' => ['required', 'exists:routes,id'],
            'flight_number' => ['required', 'string', 'max:50'],
            'departure_date' => ['required', 'date'],
            'departure_time' => ['required'],
            'arrival_time' => ['required'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:scheduled,delayed,cancelled,completed'],
        ]);

        $flightSchedule->update($validated);

        return redirect()->route('admin.flight-schedules.index')->with('success', 'Flight schedule updated successfully.');
    }

    public function destroy(FlightSchedule $flightSchedule)
    {
        if ($flightSchedule->bookings()->exists()) {
            return back()->with('error', 'Cannot delete a flight schedule that has bookings.');
        }

        $flightSchedule->delete();

        return redirect()->route('admin.flight-schedules.index')->with('success', 'Flight schedule deleted successfully.');
    }
}
