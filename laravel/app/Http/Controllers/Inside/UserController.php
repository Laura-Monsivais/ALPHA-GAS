<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Session;
use App\Exports\UsersExport;
use App\Traits\UserTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use UserTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    public function getUsers(Request $request)
    {
        $all = $this->queryGetUsersTrait();
        /* Búsqueda avanzada A-Z */
        if(isset($request->cellphone)) {
            $all = $all->where('users.cellphone', 'like', '%'.$request->cellphone.'%');
        }
        if(isset($request->createdAtStart)) {
            $all = $all->where('users.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('users.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->lastname1)) {
            $all = $all->where('users.lastname1', 'like', '%'.$request->lastname1.'%');
        }
        if(isset($request->lastname2)) {
            $all = $all->where('users.lastname2', 'like', '%'.$request->lastname2.'%');
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if(isset($request->name)) {
            $all = $all->where('users.name', 'like', '%'.$request->name.'%');
        }
        if(isset($request->sessionId)) {
            $all = $all->where('users.session_id', $request->sessionId);
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('users.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertUser(Request $request)
    {
        Log::info('Controller insertUser. Request:'.$request);
        $requestUser = json_decode($request->user, true);
        $validator = Validator::make($requestUser, [
            'name' => ['required', 'max:255', 'min:1'],
            'lastname1' => ['required', 'max:255', 'min:1'],
            'lastname2' => ['max:255', 'min:1'],
            'cellphone' => ['required', 'min:10', 'max:10'],
            'password' => ['required']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller insertUser. Validation:'.$validation);
            return $validation;
        }
        try {
            $userInsert = array(
                'name' => $requestUser['name'],
                'lastname1' => $requestUser['lastname1'],
                'cellphone' => $requestUser['cellphone'],
                'password' => Hash::make($requestUser['password'])
            );
            if (isset($requestUser['lastname2'])) {
                $userInsert['lastname2'] =  $requestUser['lastname2'];
            }
            $userId = User::insertGetId($userInsert);
            $message = "Insertó usuario.";
            $userUpdate = array();
            if ($request->hasFile('avatarForm')) {
                $avatarName = $userId.'.'.$request->avatarForm->extension();
                $request->avatarForm->storeAs('users/avatars', $avatarName, 'public');
                $userUpdate['avatar'] =  $avatarName;
                $message .= "Guardó avatar.";
            }
            if ($request->hasFile('coverForm')) {
                $coverName = $userId.'.'.$request->coverForm->extension();
                $request->coverForm->storeAs('users/covers', $coverName, 'public');
                $userUpdate['cover'] =  $coverName;
                $message .= "Guardó portada.";
            }
            $requestSession = json_decode($request->session, true);
            $sessionId = Session::insertGetId([
                'user_id' => $userId,
                'rol_id' => $requestSession['rol_id'],
                'subsidiary_id' => $requestSession['subsidiary_id']
            ]); 
            $userUpdate['session_id'] =  $sessionId;
            $message .= "Insertó sesión.";
            User::where('id', $userId)
            ->update($userUpdate);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller insertUser. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller insertUser. Error:'.$error);
            return $error;
        }
    }

    public function exportUsers(Request $request) 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
    
    public function updateUser(Request $request)
    {
        Log::info('Controller updateUser. Request:'.$request);
        $requestUser = json_decode($request->user, true);
        $validator = Validator::make($requestUser, [
            'name' => ['required', 'max:255', 'min:1'],
            'lastname1' => ['required', 'max:255', 'min:1'],
            'lastname2' => ['max:255', 'min:1'],
            'cellphone' => ['required', 'min:10', 'max:10']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller updateUser. Validation:'.$validation);
            return $validation;
        }
        try {
            $userUpdate = array(
                'name' => $requestUser['name'],
                'lastname1' => $requestUser['lastname1'],
                'cellphone' => $requestUser['cellphone']
            );
            if (isset($requestUser['lastname2'])) {
                $userUpdate['lastname2'] =  $requestUser['lastname2'];
            }
            if (isset($requestUser['password'])) {
                $userUpdate['password'] =  Hash::make($requestUser['password']);
            }
            $message = "Actualizó usuario.";
            if ($request->hasFile('avatarForm')) {
                Storage::disk('public')->delete('users/avatars' . $requestUser['avatar']);
                $avatarName = $requestUser['id'].'.'.$request->avatarForm->extension();
                $request->avatarForm->storeAs('users/avatars', $avatarName, 'public');
                $userUpdate['avatar'] =  $avatarName;
                $message .= "Guardó avatar.";
            }
            if ($request->hasFile('coverForm')) {
                Storage::disk('public')->delete('users/covers' . $requestUser['cover']);
                $coverName = $requestUser['id'].'.'.$request->coverForm->extension();
                $request->coverForm->storeAs('users/covers', $coverName, 'public');
                $userUpdate['cover'] =  $coverName;
                $message .= "Guardó portada.";
            }
            User::where('id', $requestUser['id'])
            ->update($userUpdate);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller updateUser. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller updateUser. Error:'.$error);
            return $error;
        }
    }

    public function updateUserSessionId(Request $request)
    {
        Log::info('Controller updateUserSessionId. Request:'.$request);
        $this->validate($request, [
            'session_id' => ['required', 'integer', 'exists:App\Models\Session,id']
        ]);
        try {
            User::where('id', Auth::user()->id)
            ->update([
                'session_id' => $request->session_id
            ]);            
            $response = response()->json(200);
            Log::alert('Controller updateUserSessionId. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateUserSessionId. Error:'.$error);
            return $error;
        }
    }

    public function getUserAvatar($avatar = null)
    {
        Log::info('Controller getUserAvatar. Request:'.$avatar);
        if (isset($avatar)) {
            try {
                $response = Storage::response("public/users/avatars/" . $avatar);
                Log::alert('Controller getUserAvatar. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/users/avatars/default.png");
                Log::error('Controller getUserAvatar. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/users/avatars/default.png");
            Log::error('Controller getUserAvatar. Error:'.$error);
            return $error;
        }
    }
    
    public function downloadUserAvatar(Request $request) 
    {
        Log::info('Controller downloadUserAvatar. Request:'.$request);
        if (isset($request->avatar)) {
            try {
                $response = Storage::download("public/users/avatars/".$request->avatar);
                Log::alert('Controller downloadUserAvatar. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/users/avatars/default.png");
                Log::error('Controller downloadUserAvatar. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/users/avatars/default.png");
            Log::error('Controller downloadUserAvatar. Error:'.$error);
            return $error;
        }
    }

    public function getUserCover($cover = null)
    {
        Log::info('Controller getUserCover. Request:'.$cover);
        if (isset($cover)) {
            try {
                $response = Storage::response("public/users/covers/" . $cover);
                Log::alert('Controller getUserCover. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/users/covers/default.jpg");
                Log::error('Controller getUserCover. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/users/covers/default.jpg");
            Log::error('Controller getUserCover. Error:'.$error);
            return $error;
        }
    }
    
    public function downloadUserCover(Request $request) 
    {
        Log::info('Controller downloadUserCover. Request:'.$request);
        if (isset($request->cover)) {
            try {
                $response = Storage::download("public/users/covers/".$request->cover);
                Log::alert('Controller downloadUserCover. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/users/covers/default.jpg");
                Log::error('Controller downloadUserCover. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/users/covers/default.jpg");
            Log::error('Controller downloadUserCover. Error:'.$error);
            return $error;
        }
    }
}
