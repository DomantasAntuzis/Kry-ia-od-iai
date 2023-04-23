<?php

namespace App\Http\Controllers;

use App\Models\Crossword;
use Illuminate\Http\Request;

class CrosswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        $crosswords = "kazkas";
//       return $crosswords = Crossword::all();
        return "kazkas";

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'words' => 'required|',
            'difficulty' => 'required|string'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Crossword $crossword)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crossword $crossword)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Crossword $crossword)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crossword $crossword)
    {
        //
    }
}
