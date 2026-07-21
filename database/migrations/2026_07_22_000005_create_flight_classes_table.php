<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flight_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flight_schedule_id')->constrained('flight_schedules')->cascadeOnDelete();
            $table->string('name'); // Economy, Business
            $table->decimal('price', 10, 2); // final price for this class (can differ from base_price)
            $table->unsignedInteger('total_seats');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flight_classes');
    }
};
