<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Airline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirlineController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Airlines/Index', [
            'airlines' => Airline::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Airlines/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:airlines,code'],
            'logo' => ['nullable', 'string', 'max:255'],
        ]);

        Airline::create($validated);

        return redirect()->route('admin.airlines.index')->with('success', 'Airline created successfully.');
    }

    public function edit(Airline $airline)
    {
        return Inertia::render('Admin/Airlines/Edit', [
            'airline' => $airline,
        ]);
    }

    public function update(Request $request, Airline $airline)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:airlines,code,' . $airline->id],
            'logo' => ['nullable', 'string', 'max:255'],
        ]);

        $airline->update($validated);

        return redirect()->route('admin.airlines.index')->with('success', 'Airline updated successfully.');
    }

    public function destroy(Airline $airline)
    {
        if ($airline->routes()->exists()) {
            return back()->with('error', 'Cannot delete an airline that has routes.');
        }

        $airline->delete();

        return redirect()->route('admin.airlines.index')->with('success', 'Airline deleted successfully.');
    }
}
