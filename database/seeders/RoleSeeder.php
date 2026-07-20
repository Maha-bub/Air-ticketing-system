<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Creates the 3 base roles for the Air Ticketing System.
     * Run with: php artisan db:seed --class=RoleSeeder
     */
    public function run(): void
    {
        $roles = ['admin', 'agent', 'customer'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}
