<?php

namespace App\Http\Controllers\Inside;

use App\Http\Controllers\Controller;
use App\Exports\ProductsExport;
use App\Models\Product;
use App\Traits\ProductTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    use ProductTrait;
    /**
     * The name of the controller corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    public function getProducts(Request $request)
    {
        $all = $this->queryGetProductsTrait($request);
        return response()->json($all);
    }

    public function insertProduct(Request $request)
    {
        Log::info('Controller insertProduct. Request:'.$request);
        $requestProduct = json_decode($request->product, true);
        $validator = Validator::make($requestProduct, [
            'name' => ['required', 'max:255', 'min:1'],
            'unit' => ['required', 'max:255', 'min:1'],
            'cost' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'business_id' => ['required', 'integer', 'exists:App\Models\Business,id']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller insertProduct. Validation:'.$validation);
            return $validation;
        }
        try {
            $product = new Product;//ProductObserver created
            $product->name = $requestProduct['name'];
            $product->description = $requestProduct['description'];
            $product->content = $requestProduct['content'];
            $product->unit = $requestProduct['unit'];
            $product->cost = $requestProduct['cost'];
            $product->price = $requestProduct['price'];
            $product->business_id = $requestProduct['business_id'];
            $product->category_id = ($requestProduct['category_id'] != 0) ? $requestProduct['category_id'] : NULL;
            $product->save();
            $productId = $product->id;
            $message = "Insertó producto.";
            if ($request->hasFile('imageForm')) {
                $imageName = $productId . '.' . $request->imageForm->extension();
                $request->imageForm->storeAs('products/images/', $imageName, 'public');
                Product::where('id', $productId)
                ->update([
                    'image' => $imageName
                ]);
                $message .= "Insertó imagen del producto";
            }
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller insertProduct. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller insertProduct. Error:'.$error);
            return $error;
        }
    }

    public function updateProduct(Request $request)
    {
        Log::info('Controller updateProduct. Request:'.$request);
        $requestProduct = json_decode($request->product, true);
        $validator = Validator::make($requestProduct, [
            'id' => ['required', 'integer'],
            'name' => ['required', 'max:255', 'min:1'],
            'unit' => ['required', 'max:255', 'min:1'],
            'cost' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'business_id' => ['required', 'integer', 'exists:App\Models\Business,id']
        ]);
        if(!$validator->passes()){
            $validation = response()->json(['errors' => $validator->errors()->all(), 'message' => "The given data was invalid."], 422);
            Log::error('Controller updateProduct. Validation:'.$validation);
            return $validation;
        }
        try {
            $rowUpdateProduct = [
                'name' => $requestProduct['name'],
                'description' => $requestProduct['description'],
                'content' => $requestProduct['content'],
                'unit' => $requestProduct['unit'],
                'cost' => $requestProduct['cost'],
                'price' => $requestProduct['price'],
                'business_id' => $requestProduct['business_id'],
                'category_id' => ($requestProduct['category_id'] != 0) ? $requestProduct['category_id'] : NULL
            ];
            $message = "Actualizó producto.";
            if ($request->hasFile('imageForm')) {
                Storage::disk('public')->delete('products/images/' . $request->image);
                $imageName = $requestProduct['id'] . '.' . $request->imageForm->extension();
                $request->imageForm->storeAs('products/images/', $imageName, 'public');
                $rowUpdateProduct['image'] = $imageName;
                $message .= "Actualizó imagen del producto";
            }
            Product::find($requestProduct['id'])//ProductObserver updated
            ->update($rowUpdateProduct);
            $response = response()->json(['status' => 200, 'message' => $message]);
            Log::alert('Controller updateProduct. Response:'.$response);
            return $response;
        } catch (\Exception $catchError) {
            $error = response()->json(['status' => 500, 'message' => $catchError->getMessage()]);
            Log::error('Controller updateProduct. Error:'.$error);
            return $error;
        }
    }

    public function getProductImage($image = null)
    {
        Log::info('Controller getProductImage. Request:'.$image);
        if (isset($image)) {
            try {
                $response = Storage::response("public/products/images/" . $image);
                Log::alert('Controller getProductImage. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::response("public/products/images/default.png");
                Log::error('Controller getProductImage. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::response("public/products/images/default.png");
            Log::error('Controller getProductImage. Error:'.$error);
            return $error;
        }
    }

    public function downloadProductImage(Request $request)
    {
        Log::info('Controller downloadProductImage. Request:'.$request);
        if (isset($request->image)) {
            try {
                $response = Storage::download("public/products/images/" . $request->image);
                Log::alert('Controller downloadProductImage. Response:'.$response);
                return $response;
            } catch (\Exception $e) {
                $error = Storage::download("public/products/images/default.png");
                Log::error('Controller downloadProductImage. Error:'.$error);
                return $error;
            }
        } else {
            $error = Storage::download("public/products/images/default.png");
            Log::error('Controller downloadProductImage. Error:'.$error);
            return $error;
        }
    }

    public function exportProducts(Request $request)
    {
        return Excel::download(new ProductsExport, 'products.xlsx');
    }
}
