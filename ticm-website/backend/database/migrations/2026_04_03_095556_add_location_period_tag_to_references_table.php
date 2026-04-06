<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('references', function (Blueprint $table) {
            $table->string('location', 190)->nullable()->after('project_name');
            $table->string('period', 50)->nullable()->after('location');
            $table->string('tag', 100)->nullable()->after('period');
        });
    }

    public function down(): void
    {
        Schema::table('references', function (Blueprint $table) {
            $table->dropColumn(['location', 'period', 'tag']);
        });
    }
};
