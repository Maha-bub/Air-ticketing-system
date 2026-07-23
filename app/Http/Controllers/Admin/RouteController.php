<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Airline;
use App\Models\Airport;
use App\Models\FlightRoute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Routes/Index', [
            'routes' => FlightRoute::with(['airline', 'originAirport', 'destinationAirport'])
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Routes/Create', [
            'airlines' => Airline::orderBy('name')->get(),
            'airports' => Airport::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'airline_id' => ['required', 'exists:airlines,id'],
            'origin_airport_id' => ['required', 'exists:airports,id', 'different:destination_airport_id'],
            'destination_airport_id' => ['required', 'exists:airports,id'],
            'distance_km' => ['nullable', 'integer', 'min:0'],
        ]);

        FlightRoute::create($validated);

        return redirect()->route('admin.routes.index')->with('success', 'Route created successfully.');
    }

    public function edit(FlightRoute $route)
    {
        return Inertia::render('Admin/Routes/Edit', [
            'route' => $route,
            'airlines' => Airline::orderBy('name')->get(),
            'airports' => Airport::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, FlightRoute $route)
    {
        $validated = $request->validate([
            'airline_id' => ['required', 'exists:airlines,id'],
            'origin_airport_id' => ['required', 'exists:airports,id', 'different:destination_airport_id'],
            'destination_airport_id' => ['required', 'exists:airports,id'],
            'distance_km' => ['nullable', 'integer', 'min:0'],
        ]);

        $route->update($validated);

        return redirect()->route('admin.routes.index')->with('success', 'Route updated successfully.');
    }

    public function destroy(FlightRoute $route)
    {
        if ($route->flightSchedules()->exists()) {
            return back()->with('error', 'Cannot delete a route that has flight schedules.');
        }

        $route->delete();

        return redirect()->route('admin.routes.index')->with('success', 'Route deleted successfully.');
    }
}
