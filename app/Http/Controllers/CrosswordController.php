<?php

namespace App\Http\Controllers;


use App\Models\Crossword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CrosswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//
        return Crossword::where('confirmed', 1)->get();
//        return Crossword::all();
//        return Crossword::where('confirmed', 1)->get();


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // redirect to create form
        return redirect('api/store');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate crossword data
//        $data = $request->validate([
//            'name' => 'required|string',
////            'user_id' => 'required|integer',
////            'confirmed' => 'integer',
//            'words' => 'required|array',
////            'questions' => 'required|array',
//            'difficulty' => 'required|in:1,2,3'
//        ]);
        $data = $request->validate([
            'name' => 'required|string',
            'words' => 'required|array',
            'difficulty' => 'required|in:1,2,3',
        ]);


        $auth = Auth::user()->id;

        // check if difficulty is correct and word count match by difficulty
        $diff = $data['difficulty'];
        $word_count = count($data['words']);
        $allowed_word_counts = [
            1 => 4,
            2 => 8,
            3 => 12
        ];
        if ($word_count !== $allowed_word_counts[$diff]) {
            $res = [
                'msg' => 'Wrong word count for the given difficulty level',
                'correct' => 'The correct word count for difficulty level ' . $diff . ' is ' . $allowed_word_counts[$diff]
            ];
            return response()->json($res, 201);
        }

        // check if created words don't have any symbols or numbers
        foreach ($data['words'] as $word) {
            if (preg_match('/[^\p{L}]/u', $word)) {
                $res = [
                    'msg' => 'Not valid word format',
                    'correct' => 'Words cannot contain any numbers or symbols'
                ];
                return response()->json($res, 201);
            }
        }

        // if all conditions are passed, create a new collection
        $crossword = Crossword::create([
            'name' => $data['name'],
            'user_id' => $auth,
            'words' => $data['words'],
            'difficulty' => $data['difficulty'],
            'confirmed' => '0',
        ]);
        $res = [
            'crossword' => $crossword,
            'success' => 'true'
        ];
        return response()->json($res, 201);

    }


    /**
     * Display the specified resource.
     */

    function show(Crossword $crossword)
    {
//return selected crossword
//        dd($crossword);
        $res = [
            'crossword' => $crossword,
            'success' => 'true'
        ];
        return response()->json($res, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public
    function edit(Crossword $crossword)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public
    function update(Request $request, Crossword $crossword)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(Crossword $crossword)
    {
        //
    }
}


