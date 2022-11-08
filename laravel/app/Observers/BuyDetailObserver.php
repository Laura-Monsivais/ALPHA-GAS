<?php

namespace App\Observers;

use App\Models\BuyDetail;
use App\Models\Inventory;
use Illuminate\Support\Facades\Log;

class BuyDetailObserver
{
    /**
     * Handle the buy detail "created" event.
     *
     * @param  \App\BuyDetail  $buyDetail
     * @return void
     */
    public function created(BuyDetail $buyDetail)
    {
        Log::info('Observer created. BuyDetail:'.$buyDetail);        
        if(isset($buyDetail->inventory_id)){
            $inventory = Inventory::where('id', $buyDetail->inventory_id)->first();
            Inventory::find($buyDetail->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => $inventory->inventory_theoretical + $buyDetail->quantity,//Se suma la cantidad para representar la ENTRADA de mercancía
                'buys' => $inventory->buys + $buyDetail->amount//Se suma el monto para obtener el DINERO TOTAL DE COMPRAS
            ]);
        }
    }

    /**
     * Handle the buy detail "updating" event.
     *
     * @param  \App\BuyDetail  $buyDetail
     * @return void
     */
    public function updating(BuyDetail $buyDetail)
    {
        Log::info('Observer updating. BuyDetail:'.$buyDetail);
        if(isset($buyDetail->inventory_id)){
            $inventoryPrevious = Inventory::where('id', '=', $buyDetail->inventory_id)->first();
            $buyDetailPrevious = BuyDetail::where('id', '=', $buyDetail->id)->first();
            Inventory::find($buyDetail->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => ($inventoryPrevious->inventory_theoretical - $buyDetailPrevious->quantity) + $buyDetail->quantity,
                'buys' => ($inventoryPrevious->buys - $buyDetailPrevious->amount) + $buyDetail->amount
            ]);
        }
    }

    /**
     * Handle the buy detail "deleted" event.
     *
     * @param  \App\BuyDetail  $buyDetail
     * @return void
     */
    public function deleted(BuyDetail $buyDetail)
    {
        //
    }

    /**
     * Handle the buy detail "restored" event.
     *
     * @param  \App\BuyDetail  $buyDetail
     * @return void
     */
    public function restored(BuyDetail $buyDetail)
    {
        //
    }

    /**
     * Handle the buy detail "force deleted" event.
     *
     * @param  \App\BuyDetail  $buyDetail
     * @return void
     */
    public function forceDeleted(BuyDetail $buyDetail)
    {
        //
    }
}
