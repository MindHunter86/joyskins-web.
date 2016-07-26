<?php
    $duel_bets = \App\duel_bet::get_room_bets($duel->id);
    $host_user = \App\User::get_user_cache($duel_bets[0]->user_id);
    if(count($duel_bets)>1)
        $join_user = \App\User::get_user_cache($duel_bets[1]->user_id);
        $total_bet = 0;

        if($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_FINISHED){
            foreach ($duel_bets as $bet)
                $total_bet += $bet->price;
            $host_chance = $duel_bets[0]->price*100/$total_bet;
        }
        else{
            $host_chance = 100;
            $total_bet = $duel_bets[0]->price;
        }
?>
<a title="Закрыть" class="closeView">X</a>
<h1 style="text-align: center;
padding-top: 10px;
padding-bottom: 10px;
width: 100%;
margin-bottom: 10px;
background-color: #236235;">CoinFlip # {{$duel->id}}</h1>
<div class="info-block">
    <div class="host-player">
        @if(isset($host_user))
            <img src="{{$host_user->avatar}}" style="width: 120px; vertical-align: middle;" />
            <div style="position:relative;     ">
            @if($duel_bets[0]->coin)
                <img style="bottom: -10px;
    left: -10px; position: absolute;" class="coin-ava" src="{{asset('assets/img/coin-ct.png')}}">
            @else
                <img style="bottom: -10px;
    left: -10px; position: absolute;" class="coin-ava" src="{{asset('assets/img/coin-t.png')}}">
            @endif
            </div>


        @endif
    </div>
    <div class="center-coin">
        @if($duel->status == \App\duel::STATUS_FINISHED)
            <div id="duel-winner-side">
            </div>
            <?php $win_coin = ($duel->winner_id==$join_user->id) ? $duel_bets[1]->coin : $duel_bets[0]->coin; ?>
            @if($win_coin == 1)
                <div style="display: block;" id="cfanim-wrapper"><div class="animation1260" id="coin"><div class="front"></div><div class="back"></div></div></div>
                @else
                <div style="display: block;" id="cfanim-wrapper"><div class="animation1080" id="coin"><div class="back"></div><div class="front"></div></div></div>
                @endif

        @elseif(isset($join_user) && ($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_PLAYING))
            <div id="viewtimer{{$duel->id}}">
            </div>
            <?php
            if ($duel->status == \App\duel::STATUS_PRE_FINISH){
                $cooldown = 10;
                $color = '#236235';
                $stroke = '#477050';
            } else {
                $cooldown = 90;
                $color = '#FF0000';
                $stroke = '#700005';
            }
            $date = new Carbon\Carbon($duel_bets[1]->updated_at);
            $now = Carbon\Carbon::now();
            $diff = $cooldown-$date->diffInSeconds($now);
            ?>
            <script type="text/javascript" charset="utf-8">
                $("#viewtimer{{$duel->id}}").countdown360({
                    radius      : 50,
                    seconds     : {{$diff}},
                    fontColor   : '#FFFFFF',
                    strokeWidth : 4,
                    strokeStyle: '{{$stroke}}',
                    fillStyle: '{{$color}}',
                    autostart   : false,
                    onComplete  : function () {}
                }).start()
            </script>
        @endif
    </div>
    <div class="join-player">

        @if(isset($join_user))
            <img src="{{$join_user->avatar}}" style="width: 120px; vertical-align: middle;" />
            <div style="position:relative;">
            @if($duel_bets[1]->coin)
                <img style="bottom: -10px;
                     left: -10px; position: absolute;" class="coin-ava" src="{{asset('assets/img/coin-ct.png')}}">
            @else
                <img style="bottom: -10px;
                     left: -10px; position: absolute;" class="coin-ava" src="{{asset('assets/img/coin-t.png')}}">
            @endif
        </div>

        @endif
    </div>
</div>
<div class="info-line">
    <p class="usernames">
        @if(isset($host_user))
            {{$host_user->username}}<br>
            {{$host_chance}}%
        @endif
    </p>
    <p class="usernames">
        @if(isset($join_user))
            {{$join_user->username}}<br>
            {{100-$host_chance}}%
        @endif
    </p>
    <div class="clear"></div>
    <p style="text-align: center; display: block; padding-right: 5.5%;"><br>
        Хэш раунда: {{md5($duel->secret.':'.$duel->rand_number)}}

        @if($duel->status == \App\duel::STATUS_FINISHED)
            <script>setTimeout(function(){$('#winner_info').show();},3000);</script>
            <p id="winner_info" style="display:none; text-align: center; padding-right: 5.5%;">
                Число раунда: {{$duel->rand_number}}<br>Секретное слово: {{$duel->secret}}<br>Банк : {{$total_bet}}
            </p>
        @endif
        </p>
</div>
<div class="items-block">
    <div class="host-items">
        <?php $items = json_decode($duel_bets[0]->items); ?>
        @foreach($items as $item)
        <div class="item">
            <div class="item-img">
                <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" class="img-responsive" title="{{$item->market_hash_name}} - {{$item->price}} руб.">
            </div>
            <p class="view-name">{{$item->market_hash_name}}</p>
            <p class="view-price">{{$item->price}} руб.</p>
        </div>
            @endforeach
    </div>
    <div style="margin-left: 10px;" class="join-items">
        @if(isset($join_user))
            @if($duel_bets[1]->status!=\App\duel_bet::STATUS_ACCEPTED)
                    Игрок заходит.
                @else
                <?php $items = json_decode($duel_bets[1]->items); ?>
                @foreach($items as $item)
                    <div class="item">
                            <div class="item-img">
                            <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" class="img-responsive" title="{{$item->market_hash_name}} - {{$item->price}} руб.">
                            </div>
                            <p class="view-name">{{$item->market_hash_name}}</p>
                            <p class="view-price">{{$item->price}} руб.</p>
                    </div>
                @endforeach
                @endif
            @endif
    </div>

</div>