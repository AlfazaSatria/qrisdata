<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesertaEventModel extends Model
{
  

    protected $table = 'peserta_event';

    public function refEvent()
    {
        return $this->belongsTo(RefEventModel::class, 'event_id');
    }
}
