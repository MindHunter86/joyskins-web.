@extends('layout')

@section('content')
    <script type="text/javascript" src="{{ asset('assets/js/circle-progress.js') }}"></script>
    <script type="text/javascript" src="{{asset('assets/js/radial-progress-bar.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery.countdown360.min.js')}}"></script>
    <style>
        .inv_d_item {
            display: inline-block;
            margin: 2px;
        }
        .inv_choosen {
            background-color: greenyellow;
        }
        .coin.choosen {
            background-color: darkseagreen;
        }
        .coin {
            margin: 2px;
            display: inline-block;
            width: 50px;
        }
        .btnCreateRoom {
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #236235;
            text-decoration: none;
            cursor:pointer;
        }
        .btnCreateRoom:hover{
            text-decoration: none;;
        }
        .inv_info{
            float: left;
        }
        .show_inv{
            background-color: green;
            width: 100%;
            text-align: center;
            margin-top: 10px;
            padding: 15px;
            cursor:pointer;
        }
        .cf-items{
            font-size: 10px;
        }
        .cf-items img{
            width: 45px;
            height: 45px;
        }
        .coinflip-pots {
            margin-top: 10px;
            border-top: 3px solid #3faa5d;
            border-collapse: collapse;
            width: 100%;
        }
        .coinflip-pots .cf-players {
            width: 150px;
            text-align: center;
            padding: 8px;
            line-height: 1.42857143;
        }
        .coinflip-pots .cf-players img{
            width: 45px;
            height: 45px;
        }
        .coinflip-pots tbody tr{
            padding-top: 5px;
            padding-bottom: 5px;
        }
        .coinflip-pots tbody tr:nth-child(2n)
        {
            background-color: #002f17;
        }
        .coinflip-pots thead{
            border-bottom: 1px solid #3faa5d;

        }
        .coinflip-pots thead tr th{
            padding: 8px;

        }
        .cfRoundJoin{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #45ad62;
            text-decoration: none;
            cursor:pointer;
        }
        .cfRoundJoin:hover{
            text-decoration: none;
        }
        .cfRoundView:hover{
            text-decoration: none;
        }
        .cfRoundView{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #236235;
            text-decoration: none;
            cursor:pointer;
        }
        .circle strong {
            position: absolute;
            margin-top: 22px;
            margin-left: -40px;
            text-align: center;
        }
        .window {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,0.7);
            z-index: 99999;
            -webkit-transition: opacity 400ms ease-in;
            -moz-transition: opacity 400ms ease-in;
            transition: opacity 400ms ease-in;
            display: none;
        }

        .window:target {
            display: block;
            pointer-events: auto;
        }


        .close {
            background: #cc3300;
            color: #FFFFFF;
            line-height: 25px;
            position: absolute;
            right: 10px;
            text-align: center;
            top: 22px;
            width: 24px;
            cursor: pointer;
            text-decoration: none;
            font-weight: bold;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
            -moz-box-shadow: 1px 1px 3px #000;
            -webkit-box-shadow: 1px 1px 3px #000;
            box-shadow: 1px 1px 3px #000;
        }
        .close:hover { background: #990000; }
        .btnShowInv{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #236235;
            text-decoration: none;
            cursor:pointer;
        }
        .btnShowInv:hover{
            text-decoration: none;;
        }
        .btnJoinRoom{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #236235;
            text-decoration: none;
            cursor:pointer;
            width:100%;
        }
        .btnJoinRoom:hover{
            text-decoration: none;;
        }
        .inv_table_duel {
            overflow: auto;
            height: 100%;
        }
        .btnCheckBet{
            display: inline-block;
            float: left;
            padding: 15px;
            text-align: center;
            background-color: #00bdcd;
            text-decoration: none;
            cursor:pointer;
            width:100%;
        }
        .btnCheckBet:hover{
            text-decoration: none;
        }
        .viewRoomBet {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,0.7);
            z-index: 99999;
            -webkit-transition: opacity 400ms ease-in;
            -moz-transition: opacity 400ms ease-in;
            transition: opacity 400ms ease-in;
            display: none;
            overflow-y: scroll;
            overflow-x: hidden;
            height: 100%;
        }

        .viewRoomBet:target {
            display: block;
            pointer-events: auto;
        }
        .viewRoomBet .info-block {
            padding-left: 30%;
            padding-right: 30%;
        }
        .viewRoomBet .info-block .host-player {
            width: 32%;
            display:inline-block;
        }
        .viewRoomBet .info-block .center-coin{
            width: 32%;
            display: inline-block;
        }
        .viewRoomBet .info-block .join-player {
            width: 32%;
            display:inline-block;
        }
        .viewRoomBet .info-line {
            padding-top: 15px;
            padding-bottom: 15px;
            width: 100%;
            background-color: #236235;
        }
        .hash {
            margin-top: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 20px;
            padding-right: 20px;
            background-color: #236235;
        }
        .info-line .usernames{
            display: inline-block;
            width: 20%;
            float:left;
        }
        .info-line .usernames:first-child{
            padding-left: 30%;
        }
        .info-line .usernames:last-child{
            padding-left: 6%;
        }
        .viewRoomBet .items-block{
            width: 100%;
            margin-left:  20%;
            margin-right: 20%;
            padding-top: 20px;

        }
        .viewRoomBet .items-block .host-items{
            display: inline-block;
            width: 29%;
            float:left;
            background-color: #236235;
        }
        .viewRoomBet .items-block .join-items{
            display: inline-block;
            width: 29%;
            background-color: #236235;
        }
        .items-block .item {
            display:block;
            width: 100%;
            border-bottom: 1px solid #31d355;
        }
        .info-line:after {
            content: " ";
            clear: both;
            display: table;
        }
        .items-block:after {
            content: " ";
            clear: both;
            display: table;
        }
        .items-block .item .view-price{
            width:25%;
            padding-top: 10px;
            display:inline-block;
        }
        .items-block .item:after {
            content: " ";
            clear: both;
            display: table;
        }
        .items-block .item p{
            text-align: center;
        }
        .items-block .item .item-img{
            float:left;
            display:inline-block;
            width: 24%;
        }
        .items-block .item img{
            width:45px;

        }
        .items-block .item .view-name{
            width:50%;
            padding-top: 10px;
            display:inline-block;
        }
        .closeView {
            background: #cc3300;
            color: #FFFFFF;
            line-height: 25px;
            position: absolute;
            right: 10px;
            text-align: center;
            top: 22px;
            width: 24px;
            cursor: pointer;
            text-decoration: none;
            font-weight: bold;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
            -moz-box-shadow: 1px 1px 3px #000;
            -webkit-box-shadow: 1px 1px 3px #000;
            box-shadow: 1px 1px 3px #000;
        }
        canvas{
            vertical-align: middle;
        }
        .coin-ava{
            width: 50px;
        }
        .closeView:hover { background: #990000; }
        .duel-show-side {
            margin: 0 auto;
            height: 120px;
            width: 120px;
            position: relative;
        }
        .flip-container, .front, .back {
            width: 120px;
            height: 120px;
        }
        .flip-container {
            perspective: 1000;
            -webkit-perspective: 1000;
            -moz-perspective: 1000;
        }
        .flip-me-t .flipper, .flip-container.hover .flipper, .flip-container.flip .flipper {
            transform: rotateY(1440deg);
            -moz-transform: rotateY(1440deg);
            -o-transform: rotateY(1440deg);
            -webkit-transform: rotateY(1440deg);
        }
        .flipper {
            transition: 4s;
            -webkit-transition: 4s;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
            position: relative;
        }
        .front {
            z-index: 2;
            -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
        }
        img {
            vertical-align: middle;
        }
        img {
            border: 0;
        }
        .back {
            -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
        }
        .front, .back {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            position: absolute;
            top: 50px;
            left: 0;
        }
        .flip-me-ct .flipper, .flip-container.hover .flipper, .flip-container.flip .flipper {
            transform: rotateY(1620deg);
            -moz-transform: rotateY(1620deg);  /* FF3.5/3.6 */
            -o-transform: rotateY(1620deg);  /* Opera 10.5 */
            -webkit-transform: rotateY(1620deg);  /* Saf3.1+ */
        }

        .flip-me-t .flipper, .flip-container.hover .flipper, .flip-container.flip .flipper {
            transform: rotateY(1440deg);
            -moz-transform: rotateY(1440deg);  /* FF3.5/3.6 */
            -o-transform: rotateY(1440deg);  /* Opera 10.5 */
            -webkit-transform: rotateY(1440deg);  /* Saf3.1+ */
        }
        .inv_d_item:hover::after{
            content: 'Имя: 'attr(data-name)' || Цена: 'attr(data-price)' руб.';
            left: 0;
            position: absolute;
            right: 0;
            bottom: 15px;
            z-index: 1;
            background: rgba(68, 167, 0, 0.6);
            color: #fff;
            padding: 5px 10px;
            border: 1px solid #333;
        }
    </style>
    <div class="content_bg">
        <div class="full">
            @if(\Auth::check())
            @foreach(\App\duel_bet::where('status',\App\duel_bet::STATUS_WAIT_TO_ACCEPT)->where('user_id',\Auth::user()->id)->get()  as $bet)
                <h3>Вы вступили в игру, у вас есть: 60 сек для подтверждения</h3>
                <h3>Ваша ставка:</h3>
                <?php $items = json_decode($bet->items)?>
                @foreach($items as $item)
                    <img width="45" height="45" src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" alt="">
                @endforeach
                <br>
            @endforeach
            <div class="content_title"><div>Coin<b>flip</b>. Создавайте или вступайте в игру.</div></div>
            <div class="clear"></div>
            <div id="modalShowAction" class="window">
                <a title="Закрыть" class="close">X</a>
                <div class="clear"></div>
                <div class="inv_cash">Загрузка инвентаря...</div>
                <div style="display: block;">
                    <div id="createRoom">
                        <a class="btnCreateRoom">Создать комнату</a>
                        <img src="{{asset('assets/img/coin-t.png')}}" data-coin="0" class="coin choosen">
                        <img src="{{asset('assets/img/coin-ct.png')}}" data-coin="1" class="coin">
                    </div>
                    <div  id="joinRoom">
                        <a class="btnJoinRoom" style="width:auto;">Войти в комнату</a>
                        <div style="left: 20%;
    margin-top: 15px;" class="content_title"><div>Нужно: <b id="room_start">500</b>-<b id="room_end">600</b> руб.</div></div>

                        <div class="clear"></div>
                    </div>
                    <div class="content_title inv_info"><div>Предметов выбрано: <b class="inv_count">0</b>, Сумма предметов: <b class="inv_price">0</b></div></div>
                </div>
                <div style="clear: both; content: ' '; display: table;" ></div>
                <div class="inv_table_duel">

                </div>
            </div>
            <a class="btnShowInv">Создать комнату</a>
                @endif
            <div class="duel_games_list"><table class="coinflip-pots table">
                    <thead>
                    <tr>
                        <th>Игроки</th>
                        <th>Предметы</th>
                        <th>Всего</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody id="roomList">
                    @foreach(\App\duel::where('status',\App\duel::STATUS_PLAYING)->orWhere('status',\App\duel::STATUS_PRE_FINISH)->get() as $duel)
                        @include('includes.room',compact('duel'))
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="viewRoomBet">
    </div>
    <script>
        $(function(){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

        });
    </script>
@endsection