<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\File;

class ProfileController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $profile = Profile::with(['user', 'user.roles'])->find($id);

        return response()->json([
            'success' => true,
            'profile' => $profile,
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $user = User::with(['profile', 'roles'])->find( $id );

        DB::beginTransaction();

        if ($request->hasFile('avatar')) {

            $path = 'images/avatars/' . $user->profile->avatar;

            if (File::exists($path)) {

                File::delete($path);
            }

            $file = $request->file('avatar')[0];
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('images/avatars/'), $filename);

            $user->profile->update([
                'avatar' => $filename,
            ]);
        }



        if ($request->hasFile('background_cover')) {

            $path = 'images/backgrounds/' . $user->profile->background_cover;

            if (File::exists($path)) {

                File::delete($path);
            }

            $file = $request->file('background_cover')[0];
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('images/avatars/'), $filename);

            $user->profile->update([
                'background_cover' => $filename,
            ]);
        }


        $user->profile->update([
            'username' => $request->username,
            'first_name' => $request->first_name,
            'last_name'=> $request->last_name,
            'about' => $request->about,
            'country' => $request->country,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
        ]);

        DB::commit();

        return response()->json([
            'success'=> true,
            'message'=> "Profile Successfully Updated",
            'user' => User::with(['profile','roles'])->find($id),
        ], 201);
    }

}
