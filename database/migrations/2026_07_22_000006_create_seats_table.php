<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flight_schedule_id')->constrained('flight_schedules')->cascadeOnDelete();
            $table->foreignId('flight_class_id')->constrained('flight_classes')->cascadeOnDelete();
            $table->string('seat_number'); // e.g. 12A
            $table->boolean('is_booked')->default(false);
            $table->timestamps();

            // Prevent duplicate seat numbers within the same flight
            $table->unique(['flight_schedule_id', 'seat_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
