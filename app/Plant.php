<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    public function plants()
    {
        return $this->belongsToMany(Device::class, 'devices_plants', 'devices_id','plants_id');
    }
}
