<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Session;
class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function showRegistrationForm()
    {
        $title = "Register";
        return view('auth.register', compact('title'));
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validateRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|alpha_dash',
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            Session::flash('errorMessage', $validator->errors()->first());
            return redirect('register');
        }
        $name= User::firstwhere('name', $request['name']);
        $email= User::firstwhere('email', $request['email']);

        if($name){
            Session::flash('errorMessage', 'Username sudah terpakai');
            return redirect('register');
        }

        if($email){
            Session::flash('errorMessage', 'Email sudah terdaftar');
            return redirect('register');
        }

        $user= new User();
        $user->name= $request['name'];
        $user->email= $request['email'];
        $user->password= Hash::make($request['password']);
        $user->save();

        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
}
