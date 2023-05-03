<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('apiToken')->plainTextToken;

        $res = [
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ];

        return response()->json($res, 201);
    }

    public function user_auth()
    {

        $user = Auth::user();
        $tokens = $user->tokens;
//        dd($tokens);
         if(!count($tokens)){
             $res = false;
         } else {
             $res = true;
         }

        $res = [
            'status' => $res
        ];

        return response()->json($res, 201);

    }
}
