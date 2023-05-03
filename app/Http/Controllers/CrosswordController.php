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
        return Crossword::where('confirmed', '1')->get();


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
        // dd($request->data);
   
        //validate crossword data
        $data = $request->validate([
            'name' => 'required|string',
            'usedWords' => 'required|array',
            'grid' => 'required|array',
        ]);




        // check if created words don't have any symbols or numbers
        foreach ($data['usedWords'] as $word) {
            $wordString = $word['word'];
            if (preg_match('/[^\p{L}]/u', $wordString)) {
                $res = [
                    'msg' => 'Not valid word format',
                    'correct' => 'Words cannot contain any numbers or symbols'
                ];
                return response()->json($res, 201);
            }
        }
        
        // determine crossword difficulty
        $grid_count = count($data['grid']);
        if($grid_count == 5){
            $diff = 1;
        } else if ($grid_count == 10) {
            $diff = 2;
        } else {
            $diff = 3;
        }

        // if all conditions are passed, create a new collection
        $auth = Auth::user()->id;
        $crossword = Crossword::create([
            'name' => $data['name'],
            'user_id' => $auth,
            'words' => $data['usedWords'],
            'grid' => $data['grid'],
            'difficulty' => $diff,
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


