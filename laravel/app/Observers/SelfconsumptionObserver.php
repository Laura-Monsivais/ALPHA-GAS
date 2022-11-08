<?php

namespace App\Observers;

use App\Models\Inventory;
use App\Models\SelfconsumptionModel;
use Illuminate\Support\Facades\Log;

class SelfconsumptionObserver
{
    /**
     * Handle the self consumption "created" event.
     *
     * @param  \App\SelfconsumptionModel  $selfconsumption
     * @return void
     */
    public function created(SelfconsumptionModel $selfconsumption)
    {
        Log::info('Observer created. Selfconsumption:'.$selfconsumption);
        $inventory = Inventory::where('id', $selfconsumption->inventory_id)->first();
        Inventory::find($selfconsumption->inventory_id)//InventoryObserver updated
        ->update([
            'inventory_theoretical' => $inventory->inventory_theoretical - $selfconsumption->quantity,//Se resta la cantidad para representar la SALIDA de mercancía
            'selfconsumptions' => $inventory->selfconsumptions + $selfconsumption->total//Se suma el monto para obtener el DINERO TOTAL DE AUTOCONSUMOS
        ]);
    }
    /**
     * Handle the self consumption "updating" event.
     *
     * @param  \App\SelfconsumptionModel  $selfconsumption
     * @return void
     */
    public function updating(SelfconsumptionModel $selfconsumption)
    {
        Log::info('Observer updating. Selfconsumption:'.$selfconsumption);
        $inventoryPrevious = Inventory::where('id', '=', $selfconsumption->inventory_id)->first();
        $selfconsumptionPrevious = SelfconsumptionModel::where('id', '=', $selfconsumption->id)->first();
        Inventory::find($selfconsumption->inventory_id)//InventoryObserver updated
        ->update([
            'inventory_theoretical' => ($inventoryPrevious->inventory_theoretical + $selfconsumptionPrevious->quantity) - $selfconsumption->quantity,
            'selfconsumptions' => ($inventoryPrevious->selfconsumptions - $selfconsumptionPrevious->total) + $selfconsumption->total
        ]);
    }

    /**
     * Handle the self consumption "deleted" event.
     *
     * @param  \App\SelfconsumptionModel  $selfconsumption
     * @return void
     */
    public function deleted(SelfconsumptionModel $selfconsumption)
    {
        //
    }

    /**
     * Handle the self consumption "restored" event.
     *
     * @param  \App\SelfconsumptionModel  $selfconsumption
     * @return void
     */
    public function restored(SelfconsumptionModel $selfconsumption)
    {
        //
    }

    /**
     * Handle the self consumption "force deleted" event.
     *
     * @param  \App\SelfconsumptionModel  $selfconsumption
     * @return void
     */
    public function forceDeleted(SelfconsumptionModel $selfconsumption)
    {
        //
    }
}
