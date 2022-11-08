<?php

namespace App\Observers;

use App\Models\Inventory;
use Illuminate\Support\Facades\Log;

class InventoryObserver
{
    /**
     * Handle the inventory "created" event.
     *
     * @param  \App\Inventory  $inventory
     * @return void
     */
    public function created(Inventory $inventory)
    {
    }

    /**
     * Handle the inventory "updated" event.
     *
     * @param  \App\Inventory  $inventory
     * @return void
     */
    public function updated(Inventory $inventory)
    {
        Log::info('Observer updated. Inventory:'.$inventory);
        $inventoryDifference = $inventory->inventory_theoretical - $inventory->inventory_real;
        /**
         * El "DINERO TOTAL DE VENTAS" es lo que se GANO, este anterior se le resta lo siguiente: 
         * la suma del "DINERO TOTAL DE COMPRAS", "DINERO TOTAL DE AUTOCONSUMOS" y "DINERO TOTAL DE DONACIONES";
         * estos ultimos son lo que se GASTO
         */
        $earnings = $inventory->sales - ($inventory->buys + $inventory->selfconsumptions + $inventory->donations);
        Inventory::where('id', $inventory->id)
        ->update([
            'inventory_difference' => $inventoryDifference,
            'earnings' => $earnings
        ]);
    }

    /**
     * Handle the inventory "deleted" event.
     *
     * @param  \App\Inventory  $inventory
     * @return void
     */
    public function deleted(Inventory $inventory)
    {
        //
    }

    /**
     * Handle the inventory "restored" event.
     *
     * @param  \App\Inventory  $inventory
     * @return void
     */
    public function restored(Inventory $inventory)
    {
        //
    }

    /**
     * Handle the inventory "force deleted" event.
     *
     * @param  \App\Inventory  $inventory
     * @return void
     */
    public function forceDeleted(Inventory $inventory)
    {
        //
    }
}
