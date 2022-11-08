<?php

namespace App\Observers;

use App\Models\Donation;
use App\Models\Inventory;
use Illuminate\Support\Facades\Log;

class DonationObserver
{
    /**
     * Handle the donation "created" event.
     *
     * @param  \App\Donation  $donation
     * @return void
     */
    public function created(Donation $donation)
    {
        Log::info('Observer created. Donation:'.$donation);
        $inventory = Inventory::where('id', $donation->inventory_id)->first();
        Inventory::find($donation->inventory_id)//InventoryObserver updated
        ->update([
            'inventory_theoretical' => $inventory->inventory_theoretical - $donation->quantity,//Se resta la cantidad para representar la SALIDA de mercancía
            'donations' => $inventory->donations + $donation->total//Se suma el monto para obtener el DINERO TOTAL DE DONACIONES
        ]);
    }

    /**
     * Handle the donation "updating" event.
     *
     * @param  \App\Donation  $donation
     * @return void
     */
    public function updating(Donation $donation)
    {
        Log::info('Observer updating. Donation:'.$donation);
        $inventoryPrevious = Inventory::where('id', '=', $donation->inventory_id)->first();
        $donationPrevious = Donation::where('id', '=', $donation->id)->first();
        Inventory::find($donation->inventory_id)//InventoryObserver updated
        ->update([
            'inventory_theoretical' => ($inventoryPrevious->inventory_theoretical + $donationPrevious->quantity) - $donation->quantity,
            'donations' => ($inventoryPrevious->donations - $donationPrevious->total) + $donation->total
        ]);
    }


    /**
     * Handle the donation "deleted" event.
     *
     * @param  \App\Donation  $donation
     * @return void
     */
    public function deleted(Donation $donation)
    {
        //
    }

    /**
     * Handle the donation "restored" event.
     *
     * @param  \App\Donation  $donation
     * @return void
     */
    public function restored(Donation $donation)
    {
        //
    }

    /**
     * Handle the donation "force deleted" event.
     *
     * @param  \App\Donation  $donation
     * @return void
     */
    public function forceDeleted(Donation $donation)
    {
        //
    }
}
