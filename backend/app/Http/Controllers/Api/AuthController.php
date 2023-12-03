<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request) {

        $request->validate([
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'terms' => 'required|boolean'
        ]);


        $user = User::create([
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
            'terms' => strtolower($request->terms) == '1' ? true : false,
        ]);

        $roles = Role::where('name', 'user')->first();

        $user->roles()->attach($roles);

        $user->profile()->create([
            'user_id' => $user->id,
        ]);

        $token = $user->createToken('token')->plainTextToken;

        $user = User::with(['roles', 'profile'])->find($user->id);

        return response()->json([
            'success' => true,
            'message' => 'Successfully Registered',
            'token'=> $token,
            'user' => $user
        ], 201);

    }

    public function login (Request $request) {
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Check for user
        $user = User::where('email', $request->email)->first();

        if ( !$user ) {

            return response()->json([
                'success' => false,
                'message' => 'User does not exists'
            ], 404);

        } else if ( !Hash::check($request->password, $user->password) ) {

            return response()->json([
                'success' => false,
                'message' => 'Password are incorrect'
            ], 401);
        }

        $token = $user->createToken('token')->plainTextToken;
        $user = User::with(['roles', 'profile'])->find($user->id);

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    public function logout (Request $request) {

         // Delete token
         $request->user()->currentAccessToken()->delete();

         return response()->json([
            'success'=> true,
            'message' => 'Successfully Logged Out'
         ]);
    }
}
