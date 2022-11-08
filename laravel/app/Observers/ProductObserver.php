<?php

namespace App\Observers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Subsidiary;
use Illuminate\Support\Facades\Log;

class ProductObserver
{
    /**
     * Handle the product "created" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function created(Product $product)
    {
        Log::info('Observer created. Product:'.$product);
        $subsidiaries = Subsidiary::where('business_id', $product->business_id)->get();
        foreach ($subsidiaries as $subsidiary) {
            Inventory::insert([
                'subsidiary_id' =>  $subsidiary->id,
                'product_id' => $product->id
            ]);
        }
    }

    /**
     * Handle the product "updated" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function updated(Product $product)
    {
        Log::info('Observer updated. Product:'.$product);
        if ($product->isDirty('business_id')) {//business_id has changed
            $subsidiaries = Subsidiary::where('business_id', $product->business_id)->get();
            foreach ($subsidiaries as $subsidiary) {
                try {
                    Inventory::insert([
                        'subsidiary_id' =>  $subsidiary->id,
                        'product_id' => $product->id
                    ]);
                } catch (\Exception $catchError) {
                    $error = response()->json($catchError->getMessage());
                    Log::error('Observer updated. Error:'.$error);
                }
            }
        }
    }

    /**
     * Handle the product "deleted" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function deleted(Product $product)
    {
        //
    }

    /**
     * Handle the product "restored" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function restored(Product $product)
    {
        //
    }

    /**
     * Handle the product "force deleted" event.
     *
     * @param  \App\Product  $product
     * @return void
     */
    public function forceDeleted(Product $product)
    {
        //
    }
}
