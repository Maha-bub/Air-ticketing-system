<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Airports/Index', [
            'airports' => Airport::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Airports/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:airports,code'],
            'city' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
        ]);

        Airport::create($validated);

        return redirect()->route('admin.airports.index')->with('success', 'Airport created successfully.');
    }

    public function edit(Airport $airport)
    {
        return Inertia::render('Admin/Airports/Edit', [
            'airport' => $airport,
        ]);
    }

    public function update(Request $request, Airport $airport)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:airports,code,' . $airport->id],
            'city' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
        ]);

        $airport->update($validated);

        return redirect()->route('admin.airports.index')->with('success', 'Airport updated successfully.');
    }

    public function destroy(Airport $airport)
    {
        if ($airport->originRoutes()->exists() || $airport->destinationRoutes()->exists()) {
            return back()->with('error', 'Cannot delete an airport that is used in a route.');
        }

        $airport->delete();

        return redirect()->route('admin.airports.index')->with('success', 'Airport deleted successfully.');
    }
}
