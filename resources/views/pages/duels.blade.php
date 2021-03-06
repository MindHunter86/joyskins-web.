@extends('layout')
@section('content')
    <script>
        var DUEL_MIN_PRICE = {{\App\Http\Controllers\DuelController::DUEL_MIN_PRICE}};
        var GAME_MODE = 'duel';
    </script>
    <link rel="stylesheet" href="{{asset('assets/css/jquery-ui.min.css')}}">
    <script src="{{asset('assets/js/jquery-ui.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery.countdown360.min.js')}}"></script>
    <link rel="stylesheet" href="{{asset('assets/css/duel.css')}}">
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
            <div class="content_title"><div>Coin<b>flip</b> БЕТА. Создавайте или вступайте в игру. Мин. сумма ставки: 30 руб.</div></div>
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
                <a style="display: inline-block;
    float: left;
    padding: 15px;
    background-color: rgb(107, 39, 132);
    text-decoration: none;
    cursor:pointer;" onclick="loadDuelHistory()">История игр</a>
                <a style="display: inline-block;
    float: left;
    padding: 15px;
    background-color: rgb(9, 132, 100);
    text-decoration: none;
    cursor:pointer;" onclick="$('#getStart').arcticmodal()">О дуэлях</a>
                <a style="display: inline-block;
    float: left;
    padding: 15px;
    background-color: rgb(58, 97, 132);
    text-decoration: none;
    cursor:pointer;" onclick="$('#fairplayduel').arcticmodal()">Честная игра</a>
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

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="viewRoomBet">
    </div>
@endsection
@section('modals')
    <div class="box-modal" id="fairplayduel" style="width:800px;">
        <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Честная игра</div>
        <div class="fairgame">
            <div class="fairgame_text">
                <div style="color: #3FAA5D;padding-bottom: 7px;text-align: center;text-transform: uppercase;font-size: 18px;">Честная игра - как это работает?</div>
                <div style="line-height: 18px;font-size: 13px;">                      <div style="padding-bottom: 10px;">           В начале каждого раунда наша система берет абсолютно рандомное длинное число от 0 до 1 <span style="color: #3FAA5D;">(например, 0.83952926436439157)</span> и шифрует его через md5 , и показывает его в зашифрованном виде в начале раунда.           <span style="color: #3FAA5D;">(если вы не знаете, что такое md5 - можете <a href="https://ru.wikipedia.org/wiki/MD5" style="color: #324488;" target="_blank">почитать статью на википедии</a>)</span>           </div>           <div style="padding-bottom: 10px;">           Затем, когда раунд завершился, система показывает то число и секретное слово, которое было зашифровано вначале <span style="color: #3FAA5D;">(проверить его вы можете на сайте <a href="http://www.md5.cz/" style="color: #324488;" target="_blank">md5.cz</a>)</span>в виде md5(ЧИСЛО_РАУНДА:СЕКРЕТНОЕ_СЛОВО).           </div>                             </div>
            </div>

        </div>
    </div>
    <div class="box-modal" id="getStart" style="width:900px;">
        <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>О сайте</div>
        <div class="rules">
            <div style="margin-bottom: 10px; border-left: 1px solid #FFBD4C; padding-left: 6px;">
                <span style="color: #FFBD57;">О Дуэлях</span>-Вы можете создать новую дуэль или присоединиться к уже существующей. Вам необходимо выбрать вещи из инвентаря на нашей странице, а затем нажмите кнопку, чтобы создать. После этого мы вышлем Вам трейд оффер в кратчайшие сроки,который содержит элементы, которые вы выбрали. Вы должны принять это предложение и подтвердить его с помощью мобильного телефона. После того как вы подтверждаете,у вас создатся ваша комната. <br>
                Победитель определяется случайным образом, шанс выигрыша зависит от стоимости внесенных скинов.
            </div>
            <div style="margin-bottom: 10px; padding: 5px 6px; border: 1px solid #5cb85c;">
                <span style="text-transform: uppercase; color: #3FAA5D;">ПОБЕДИТЕЛЬ ПРЕДМЕТОВ:</span>По состоянию конца игры, победитель будет показан. Победитель получит все элементы которые были в раунде. В каждой игре мы забираем 0-15%. Он рассчитывается от общей стоимости банка.</div>
            <div style="margin-bottom: 10px; border-left: 1px solid #60B3E5; padding-left: 6px; line-height: 16px;">
                <span style="color: #60B3E5; padding-bottom: 5px; text-transform: uppercase;">ПРОСОЕДИНИТСЯ К ИГРЕ:</span><br>
                <div style="margin-bottom: 8px; margin-top: 2px; padding-left: 30px;">
                    1. <span style="">Вы можете присоединиться к раунду, нажав на кнопку войти. После присоединения у Вас будет 90 секунд на принятие обмена. Если время истекло, мы отменим отправленное предложение и комната снова будет свободна.
Для того, чтобы создать комнату, вы должны иметь Steam, включен Mobile Authenticator.

<br></span>
                </div>


            </div>
            <div class="rules_text" style="margin-bottom: 10px;padding-left: 6px;line-height: 18px;border: 1px solid #3FAA80;">
                <div style="color: #EC785D; padding-top: 5px; text-transform: uppercase;">Правила и особенности:</div>
                <ol style="padding: 0px 30px; margin: 3px; line-height: 15px; font-size: 13px;">
                    <li style="padding-bottom: 6px;">Максимальный депозит - 15 предметов на трейд. Нет ограничений по стоимости предметов. Стоимость одного депозита - минимум 30р.</li>
                    <li style="padding-bottom: 6px;">Для развития сайта и проведения конкурсов, мы взымаем комиссию с каждой игры - до 10% от всех вещей игры.</li>
                    <li style="padding-bottom: 6px;">Депозиты и вывод призового фонда происходят автоматически. Срок отправки выигрыша зависит от загруженности ботов и серверов Steam (в среднем - 1-5 минут)</li>
                    <li style="padding-bottom: 6px;">Каждый раз отправляя предметы, Вы соглашаетесь с правилами использования сайта.</li>
                    <li style="padding-bottom: 6px;">Если Ваш инвентарь закрыт, и\или обмены разрешены только с друзьями, приз будет аннулирован!</li>
                    <li style="padding-bottom: 6px;">Принимаются вещи только из CS:GO, другие вещи будут приняты, но не засчитаны на сайте. Так-же мы можем гарантировать правильную оценку стоимости вещи только тогда, когда она есть на Торговой площадке Steam, иначе ваш предмет может быть неверно оценен.</li>
                    <li style="padding-bottom: 6px;">Вы имеете гарантию получения ваших вещей в течение получаса с момента закрытия пула. По истечении этого времени мы не несем ответственности за утерянные вещи.</li>
                    <li style="padding-bottom: 6px;">Если вы отменили обмен или отправили контр-предложение после победы, то ваши вещи возвращены вам не будут, так как бот не рассчитан на повторную отправку вещей</li>
                    <li style="padding-bottom: 6px;">Если нашего бота забанили в течение 30 минут с окончания матча, мы возмещаем только вашу ставку, но не выигрыш.</li>
                    <li style="padding-bottom: 6px;"></li>
                </ol>
            </div>
            <a href="http://www.free-kassa.ru/"><img src="./JOYSKINS.TOP_files/13.png"></a>
        </div>
    </div>
    <div class="box-modal"  id="deposit">
        <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Депозит</div>
        <div id="duel_create_room">
            <img src="https://joyskins.top/assets/img/coin-t.png" data-coin="0" class="coin choosen">
            <img src="https://joyskins.top/assets/img/coin-ct.png" data-coin="1" class="coin">
            <h5>Минимальный депозит для создания комнаты: 30 рублей.</h5>
            <h5>Максимальное количество предметов: 15.</h5>
        </div>
        <div class="row" style="margin-top: 20px; margin-bottom: 20px;">
            <div class="inventory">
                <h3 style="color: white;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 5px;
        text-align: center;
        background-color: #5cb776;">Стоимость вашего инвентаря:<span id="inv_price"></span></h3>
                <div id="inv_loader">
                    <div style="position: inherit;" class="loader-inner ball-clip-rotate-multiple blue-loader">
                        <div></div><div></div>
                    </div>
                </div>
                <div id="itemsPlace">

                </div>
                <div class="clearfix"></div>
            </div>
            <div class="pot">
                <div style="color: white; font-size:9pt;">
                    <h1>Ставка:</h1>
                    <h4 id="duel_join_room">Вам нужно поставить: <span id="min_price">3</span>-<span id="max_price">5</span></h4>
                    <h4>Сумма взноса: <span id="pot_total_price">0</span> Предметы <span id="pot_count_items">0</span> из <span style="color:#29633a;">15</span></h4>
                </div>
                <div id="potItems">

                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <a style="color: white;" class="btnReadyDeposit">Готов к игре.</a>
    </div>
    <div id="modal_view_room">
        <div class="box-modal_close arcticmodal-close"></div>
        <div class="box-modal" id="duel_view_room">
        </div>
    </div>
    <div id="historyModal" class="duel_games_list history-modal"><table class="coinflip-pots table">
            <a style="padding-left: 15px;padding-right: 15px;background-color: gray;padding-top: 8px;padding-bottom: 8px;text-decoration: none;cursor: pointer;" onclick="loadMyDuelHistory()">Моя история</a>
            <thead>
            <tr>
                <th>Игроки</th>
                <th>Предметы</th>
                <th>Всего</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody id="roomHistoryList"></tbody>
        </table></div>
@endsection