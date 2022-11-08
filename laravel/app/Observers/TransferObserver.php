<?php

namespace App\Observers;

use App\Models\Inventory;
use App\Models\Transfer;
use Illuminate\Support\Facades\Log;

class TransferObserver
{
    /**
     * Handle the transfer "created" event.
     *
     * @param  \App\Transfer  $transfer
     * @return void
     */
    public function created(Transfer $transfer)
    {
        Log::info('Observer created. Transfer:'.$transfer);
        $inventory = Inventory::where('id', $transfer->inventory_id)->first();
        if($transfer->key === "Output"){
            Inventory::find($transfer->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => $inventory->inventory_theoretical - $transfer->quantity//Se resta la cantidad para representar la SALIDA de mercancía
            ]);
        } else {
            Inventory::find($transfer->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => $inventory->inventory_theoretical + $transfer->quantity//Se suma la cantidad para representar la ENTRADA de mercancía
            ]);
        }
    }

    /**
     * Handle the transfer "updating" event.
     *
     * @param  \App\Transfer  $transfer
     * @return void
     */
    public function updating(Transfer $transfer)
    {
        Log::info('Observer updating. Transfer:'.$transfer);
        $inventoryPrevious = Inventory::where('id', '=', $transfer->inventory_id)->first();
        if($transfer->key === "Output" && $transfer->status === "Pendiente"){
            $transferPrevious = Transfer::where('id', '=', $transfer->id)->first();
            Inventory::find($transfer->inventory_id)//InventoryObserver updated
            ->update([
                'inventory_theoretical' => ($inventoryPrevious->inventory_theoretical + $transferPrevious->quantity) - $transfer->quantity
            ]);
        }
    }

    /**
     * Handle the transfer "deleted" event.
     *
     * @param  \App\Transfer  $transfer
     * @return void
     */
    public function deleted(Transfer $transfer)
    {
        //
    }

    /**
     * Handle the transfer "restored" event.
     *
     * @param  \App\Transfer  $transfer
     * @return void
     */
    public function restored(Transfer $transfer)
    {
        //
    }

    /**
     * Handle the transfer "force deleted" event.
     *
     * @param  \App\Transfer  $transfer
     * @return void
     */
    public function forceDeleted(Transfer $transfer)
    {
        //
    }
}
