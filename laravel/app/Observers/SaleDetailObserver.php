<?php

namespace App\Observers;

use App\Models\Inventory;
use App\Models\SaleDetail;
use Illuminate\Support\Facades\Log;

class SaleDetailObserver
{
    /**
     * Handle the sale detail "created" event.
     *
     * @param  \App\SaleDetail  $saleDetail
     * @return void
     */
    public function created(SaleDetail $saleDetail)
    {
        Log::info('Observer created. SaleDetail:'.$saleDetail);   
        if(isset($saleDetail->inventory_id)){
            $inventory = Inventory::where('id', $saleDetail->inventory_id)->first();
            Inventory::find($saleDetail->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => $inventory->inventory_theoretical - $saleDetail->quantity,//Se resta la cantidad para representar la SALIDA de mercancía
                'sales' => $inventory->sales + $saleDetail->amount//Se suma el monto para obtener el DINERO TOTAL DE VENTAS
            ]);
        }
    }
    /*
     * Handle the sale detail "updating" event.
     *
     * @param  \App\SaleDetail  $saleDetail
     * @return void
     */
    public function updating(SaleDetail $saleDetail)
    {
        Log::info('Observer updating. SaleDetail:'.$saleDetail);
        if(isset($saleDetail->inventory_id)){
            $inventoryPrevious = Inventory::where('id', '=', $saleDetail->inventory_id)->first();
            $saleDetailPrevious = SaleDetail::where('id', '=', $saleDetail->id)->first();
            Inventory::find($saleDetail->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => ($inventoryPrevious->inventory_theoretical + $saleDetailPrevious->quantity) - $saleDetail->quantity,
                'sales' => ($inventoryPrevious->sales - $saleDetailPrevious->amount) + $saleDetail->amount
            ]);
        }
    }

    /**
     * Handle the sale detail "deleted" event.
     *
     * @param  \App\SaleDetail  $saleDetail
     * @return void
     */
    public function deleted(SaleDetail $saleDetail)
    {
        //
    }

    /**
     * Handle the sale detail "restored" event.
     *
     * @param  \App\SaleDetail  $saleDetail
     * @return void
     */
    public function restored(SaleDetail $saleDetail)
    {
        //
    }

    /**
     * Handle the sale detail "force deleted" event.
     *
     * @param  \App\SaleDetail  $saleDetail
     * @return void
     */
    public function forceDeleted(SaleDetail $saleDetail)
    {
        //
    }
}
