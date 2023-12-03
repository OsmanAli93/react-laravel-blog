<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with(['user', 'user.profile'])->latest()->paginate(9);

        return response()->json([
            'success' => true,
            'posts'=> $posts
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "thumbnail.*" => "required|image|mimes:png,jpg,jpeg,avif,webp",
            "title" => "required|string|unique:posts,title",
            "description" => "required",
            "body" => "required"
        ]);

        DB::beginTransaction();

        $file = $request->file('thumbnail')[0];
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '.' . $extension;

        $request->user()->posts()->create([
            "thumbnail"=> $filename,
            "title"=> $request->title,
            "slug" => Str::slug($request->title, "-"),
            "description" => $request->description,
            "body"=> $request->body,
        ]);

        $file->move(public_path('images/thumbnails/'), $filename);

        DB::commit();

        return response()->json([
            'sucess' => true,
            'message'=> 'Post Successfully created'
        ], 201);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $post = Post::with(['user', 'user.profile', 'comments.user', 'comments.user.profile', 'comments.replies', 'comments.replies.replies', 'comments.replies.replies.user', 'comments.replies.replies.user.profile', 'comments.replies.user', 'comments.replies.user.profile'])->where('slug', $slug)->first();


        if ( $post->exists() ) {

            return response()->json([
                'success'=> true,
                'post'=> $post
            ], 200);
        }

        return response()->json([
            'success'=> false,
            'message'=> 'Post Not Found'
        ], 404);

    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {

        $request->validate([
            "thumbnail.*" => "image|mimes:png,jpg,jpeg,avif,webp",
            "title" => "required|string",
            "description" => "required",
            "body" => "required"
        ]);

        $post = Post::where('slug', $slug)->first();

        if ( $post ) {

            if ($request->hasFile('thumbnail')) {

                $path = 'images/thumbnails/' . $post->thumbnail;

                if (File::exists($path)) {

                    File::delete($path);
                }

                $file = $request->file('thumbnail')[0];
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move(public_path('images/avatars/'), $filename);

                $post->update([
                    'thumbnail' => $filename
                ]);

            }

            $post->update([
                'title' => $request->title,
                'description' => $request->description,
                'body' => $request->body
            ]);


            return response()->json([
                'status' => true,
                'message' => 'Post Successfully Updated'
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Post Not Found!'
        ], 404);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        $post = Post::where('slug', $slug)->first();

        if ( $post ) {

            $path = 'images/thumbnails/' . $post->thumbnail;

            if (File::exists($path)) {

                File::delete($path);
            }

            $post->delete();

            return response()->json([
                'success' => true,
                'message' => 'Post Successfully Deleted'
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Post Not Found!'
        ], 404);
    }
}
