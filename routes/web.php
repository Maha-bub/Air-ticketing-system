<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return inertia('Admin/Dashboard');
        })->name('dashboard');

        // Add Admin\AirportController, Admin\FlightController etc. here in Phase 2/4
    });

// Same pattern for agent
Route::middleware(['auth', 'verified', 'role:agent'])
    ->prefix('agent')
    ->name('agent.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return inertia('Agent/Dashboard');
        })->name('dashboard');
    });

// Customer — any logged-in user without a special role, or role:customer
Route::middleware(['auth', 'verified', 'role:customer'])
    ->prefix('my')
    ->name('customer.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return inertia('Customer/Dashboard');
        })->name('dashboard');
    });


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->hasRole('admin')) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->hasRole('agent')) {
        return redirect()->route('agent.dashboard');
    }

    return redirect()->route('customer.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
