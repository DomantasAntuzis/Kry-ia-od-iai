<?php

namespace App\Http\Controllers;


use App\Models\Crossword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function preview(Crossword $crossword)
    {
        //preview not confirmed crossword
        return $crossword;
    }

    public function confirm(Crossword $crossword)
    {
        // crossword confirmation
        $crossword->confirmed = 1;
        $crossword->save();
        return response()->json([
            'success' => true,
            'confirmed' => true,
        ]);
    }

    public function waiting(Crossword $crossword)
    {
        //preview all non confirmed crosswords
        return Crossword::all()->where('confirmed', 0);

    }

    public function remove(Crossword $crossword)
    {
        //delete selected crossword
        $crossword->destroy($crossword->_id);
        return response()->json([
            'Remove_status' => true,
            'success' => true,
        ]);
    }

}
