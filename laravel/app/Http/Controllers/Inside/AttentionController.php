<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Attention;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AttentionController extends Controller
{
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Attention::class;

    public function getAttentions(Request $request) {
        $all = Attention::select('attentions.id', 
            'attentions.key',
            'attentions.name',
            'attentions.created_at', 
            'attentions.updated_at')
        ->whereNull('attentions.deleted_at');
        if (isset($request->id)) {
            $all = $all->where('attentions.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }
}