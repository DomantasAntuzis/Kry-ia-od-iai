<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Jenssegers\Mongodb\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('mongodb')->create('crosswords', function (Blueprint $collection) {
            $collection->string('id');
            $collection->unsignedBigInteger('user_id');
            $collection->integer('confirmed')->default(0);
            $collection->unsignedTinyInteger('difficulty');
            $collection->json('words');
            $collection->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//            $collection->unique(['name', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->dropIfExists('crosswords');
    }
};


