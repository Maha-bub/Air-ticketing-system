<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    /**
     * Creates 3 test accounts, one per role, so you can log in and test
     * each dashboard without manually assigning roles via tinker.
     *
     * Run with: php artisan db:seed --class=DemoUserSeeder
     *
     * IMPORTANT: This creates test accounts with simple passwords.
     * Do NOT run this seeder in production.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            ['name' => 'Admin', 'password' => Hash::make('12345678')]
        );
        $admin->syncRoles(['admin']);

        $agent = User::firstOrCreate(
            ['email' => 'agent@example.com'],
            ['name' => 'Agent', 'password' => Hash::make('12345678')]
        );
        $agent->syncRoles(['agent']);

        $customer = User::firstOrCreate(
            ['email' => 'customer@gmail.com'],
            ['name' => 'Customer', 'password' => Hash::make('12345678')]
        );
        $customer->syncRoles(['customer']);
    }
}
