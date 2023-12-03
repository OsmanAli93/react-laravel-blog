<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;

// Public Routes
Route::post ("/register", [AuthController::class,"register"]);
Route::post ("/login", [AuthController::class,"login"]);

Route::get("/home", [PostController::class,"index"]);

Route::get("/post/{slug}", [PostController::class,"show"]);

Route::get("/users/{id}", [UserController::class,"index"]);

// Protected Routes
Route::group(["middleware"=> ["auth:sanctum"]], function () {

    Route::post("/logout", [AuthController::class, "logout"]);

    Route::get("/profile/{id}", [ProfileController::class, "show"]);
    Route::post("/profile/{id}/update", [ProfileController::class, "update"]);

    Route::post("/create/posts", [PostController::class, "store"]);

    Route::patch("/post/{slug}", [PostController::class, 'update']);
    Route::delete("/post/{slug}", [PostController::class, 'destroy']);

});
