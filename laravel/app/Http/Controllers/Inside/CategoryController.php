<?php
namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Exports\CategoriesExport;
use App\Traits\CategoryTrait;
use Maatwebsite\Excel\Facades\Excel;

class CategoryController extends Controller
{
    use CategoryTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

    public function getCategories(Request $request) {
        $all = $this->queryGetCategoriesTrait();
        /* Búsqueda avanzada A-Z */
        if(isset($request->business_id)){
            $all = $all->where('categories.business_id', $request->business_id);
        } 
        if(isset($request->createdAtStart)) {
            $all = $all->where('categories.created_at', '>=', $request->createdAtStart);
        }
        if(isset($request->createdAtEnd)) {
            $all = $all->where('categories.created_at', '<=', $request->createdAtEnd);
        }
        if(isset($request->enterpriseId)) {
            $all = $all->where('enterprises.id', 'like', '%'.$request->enterpriseId.'%');
        }
        if(isset($request->limit)) {
            $all = $all->limit($request->limit);
        }
        if(isset($request->name)) {
            $all = $all->where('categories.name', 'like', '%'.$request->name.'%');
        }
        /* Búsqueda avanzada A-Z */
        if (isset($request->id)) {
            $all = $all->where('categories.id', $request->id);
            $all = $all->first();
        } else {
            $all = $all->get();            
        }
        return response()->json($all);
    }

    public function insertCategory(Request $request) {
        Log::info('Controller insertCategory. Request:'.$request);
        $this->validate($request, [
            'name' => ['required', 'max:255', 'min:1'],
            'business_id' => ['required', 'integer', 'exists:App\Models\Business,id']
        ]);
        $requestCategory = json_decode($request->category, true);
        try {
            $categoryId = Category::insertGetId([
                'name' => $request->name,
                'business_id' => $request->business_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller insertCategory. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller insertCategory. Error:'.$error);
            return $error;
        }
    }

    public function updateCategory(Request $request) {
        Log::info('Controller updateCategory. Request:'.$request);
        $this->validate($request, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'business_id' => ['required', 'integer', 'exists:App\Models\Business,id']
        ]);
        try {
            Category::where('id', $request->id)
            ->update(['name' => $request->name,
                'business_id' => $request->business_id
            ]);
            $response = response()->json(200);
            Log::alert('Controller updateCategory. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json($catchError->getMessage());
            Log::error('Controller updateCategory. Error:'.$error);
            return $error;
        }
    }


    public function exportCategories(Request $request) 
    {
        return Excel::download(new CategoriesExport, 'categories.xlsx');
    }
}
