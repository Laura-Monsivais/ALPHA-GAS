<?php

namespace App\Observers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Subsidiary;
use Illuminate\Support\Facades\Log;

class SubsidiaryObserver
{
    /**
     * Handle the subsidiary "created" event.
     *
     * @param  \App\Subsidiary  $subsidiary
     * @return void
     */
    public function created(Subsidiary $subsidiary)
    {
        Log::info('Observer created. Subsidiary:'.$subsidiary);
        $products = Product::where('business_id', $subsidiary->business_id)->get();
        foreach ($products as $product) {        
            Inventory::insert([
                'subsidiary_id' =>  $subsidiary->id,
                'product_id' => $product->id,
            ]);      
        }
    }

    /**
     * Handle the subsidiary "updated" event.
     *
     * @param  \App\Subsidiary  $subsidiary
     * @return void
     */
    public function updated(Subsidiary $subsidiary)
    {
        Log::info('Observer updated. Subsidiary:'.$subsidiary);
        if ($subsidiary->isDirty('business_id')) {//business_id has changed
            $products = Product::where('business_id', $subsidiary->business_id)->get();
            foreach ($products as $product) {
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
     * Handle the subsidiary "deleted" event.
     *
     * @param  \App\Subsidiary  $subsidiary
     * @return void
     */
    public function deleted(Subsidiary $subsidiary)
    {
        //
    }

    /**
     * Handle the subsidiary "restored" event.
     *
     * @param  \App\Subsidiary  $subsidiary
     * @return void
     */
    public function restored(Subsidiary $subsidiary)
    {
        //
    }

    /**
     * Handle the subsidiary "force deleted" event.
     *
     * @param  \App\Subsidiary  $subsidiary
     * @return void
     */
    public function forceDeleted(Subsidiary $subsidiary)
    {
        //
    }
}
