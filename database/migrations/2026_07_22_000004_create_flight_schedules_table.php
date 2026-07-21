<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flight_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained('routes')->cascadeOnDelete();
            $table->string('flight_number');
            $table->date('departure_date');
            $table->time('departure_time');
            $table->time('arrival_time');
            $table->decimal('base_price', 10, 2);
            $table->enum('status', ['scheduled', 'delayed', 'cancelled', 'completed'])
                ->default('scheduled');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flight_schedules');
    }
};
