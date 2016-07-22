<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class duel extends Model
{
    const STATUS_NOT_STARTED = 0;
    const STATUS_PLAYING = 1;
    const STATUS_PRE_FINISH = 2;
    const STATUS_FINISHED = 3;
    const STATUS_ERROR = 4;

    const STATUS_PRIZE_WAIT_TO_SENT = 0;
    const STATUS_PRIZE_SEND = 1;
    const STATUS_PRIZE_SEND_ERROR = 2;

    public function winner()
    {
        return $this->belongsTo('App\User');
    }

    public static function get_history_duel($id)
    {
        $result = \Cache::remember('history_duel_id_'.$id,60,function($id){
            return duel::where('id',$id)->first();
        });
        return $result;
    }
}
