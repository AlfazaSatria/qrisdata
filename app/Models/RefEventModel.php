<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefEventModel extends Model
{
    protected $table = 'ref_event';

    public function pesertaEvents()
    {
        return $this->hasMany(PesertaEventModel::class, 'event_id');
    }
}
