var BANNED_DOMAINS = '(csgofast|csgolucky|csgocasino|game-luck|g2a|csgostar|hellstore|cs-drop|csgo|csgoshuffle|csgotop|csbets|csgobest|csgolike|fast-jackpot|skins-up|hardluck-shop|csgogamble|csgohot|csgofairplay|csgoluxe|csgo1|csgo-chance|csgofb|ezyskins|ezpzskins|csgokill|csgoway|csgolotter|csgomany|csrandom|csgo-winner|csgoninja|csgopick|csgodraw|csgoeasy|csgojackpot|game-raffle|csgonice|kinguin|realskins|csgofart|csgetto|csgo-rand|csgo-jackpot|timeluck|forgames|csgobig|csgo-lottery|csgovictory|csgotrophy|csgo-farming|ezskinz)\.(ru|com|net|gl|one|c|pro)';
if(typeof(GAME_MODE) === 'undefined') var GAME_MODE = 'page';
$(document).ready(function() {
    $('audio').prop("volume", 0.3);
    var chatHide = getCookie('chat');
    if(typeof chatHide === 'undefined') {
        setCookie('chat', 1);
        chatHide = 1;
    }
    $('#slider').lemmonSlider({slideToLast: false});

    
    $('.wrapper').tooltip({
        trigger: "hover",
        selector: "div[data-toggle=tooltip]"
    })
    /*if(!chatHide) {
        $('#chatContainer').hide();
        $('#chatContainer').css('width', '0%');
        $('.wrapper').css('margin-left', '0%');
        $('.chat-text').hide();
        $('.closeChat').hide();
        $('.chats').show();
    }*/
    var checkbox = false;
    $('.CheckBoxLabelClass').click(function() {
        if(checkbox) {
            $('.CheckBoxLabelClass').removeClass("LabelSelected");
            checkbox = false;
            $('.rules_button').addClass('noactive');
        }
        else {
            $('.CheckBoxLabelClass').addClass("LabelSelected");
            checkbox = true;
            $('.rules_button').removeClass('noactive');
        }
    })
    $('.rules_button').click(function() {
        if(checkbox) {
            $('#rulescheck').arcticmodal('close');
            setCookie('rules', '1', { expires: (3600 * 1000)*87660 });
        }
    });
    $('.history-block-item .user .username').each(function(){
        $(this).text(replaceLogin($(this).text()));
    });

    ITEMUP.init();
    $('[data-modal]').click(function() {
        $($(this).data('modal')).arcticmodal();
        return false;
    });
    var helpers = {
        showPopup: function(t, e, o) {
            var n = this,
                a = this.e(t, o && o.width || 950, o && o.height || 670),
                i = setInterval(function() {
                    try {
                        this.e = a.closed || void 0 === a.closed
                    } catch (t) {
                        return
                    }
                    this.e && (clearInterval(i), n.o())
                }, 100)
        }, e: function(t, e, o) {
            var n = "undefined" != typeof window.screenX ? window.screenX : window.screenLeft,
                a = "undefined" != typeof window.screenY ? window.screenY : window.screenTop,
                i = "undefined" != typeof window.outerWidth ? window.outerWidth : document.body.clientWidth,
                s = "undefined" != typeof window.outerHeight ? window.outerHeight : document.body.clientHeight - 22,
                r = n + (i - e) / 2,
                l = a + (s - o) / 2,
                c = "width=" + e + ",height=" + o + ",left=" + r + ",top=" + l + ",scrollbars=yes",
                d = window.open(t, "SteamCommunity", c);
            if ("undefined" == typeof d) {
                var p = new Error("The deposit popup was blocked by the browser");
                throw p.attemptedUrl = t, p
            }
            return d.focus && d.focus(), d
        }
    }
    $('.listPlayers').click(function(e) {
        e.preventDefault();
        $('#modal-6').arcticmodal(); 
        $('.list_participant').jScrollPane(); 
        return false;
    });
    $('.no-link').click(function () {
        $('.linkMsg').removeClass('msgs-not-visible');
        return false;
    });
    $('.chatHide').click(function(e) {
        e.preventDefault();
        $('.chat-text').hide();
        $('.closeChat').hide();
        $('#chatContainer').css('width', '0%');
        $('.wrapper').css('margin-right', '0%');
        setTimeout(function() { 
            $('#chatContainer').hide(); 
            $('.chats').show();
        }, 1800);
        chatHide = 0;
        setCookie('chat', 0);
    });
    $('.chatShow').click(function(e) {
        e.preventDefault();
        $('.chats').hide();
        $('#chatContainer').show();
        $('#chatContainer').css('width', '18%');
        $('.wrapper').css('margin-right', '12%');
        setTimeout(function() { 
            $('.chat-text').show();
            $('.closeChat').show();
        }, 1800);
        chatHide = 1;
        setCookie('chat', 1);
    });
    $('.rulesBtn').click(function () {
        var rules = getCookie('rules');
        if(typeof rules === 'undefined') {
            $('#rulescheck').arcticmodal();
            return false;
        }
    });
    $('.offer-link input, .offer-link-inMsg input')
        .keypress(function(e) {
            if (e.which == 13) $(this).next().click()
        })
        .on('paste', function() {
            var that = $(this);
            setTimeout( function() {
                that.next().click();
            }, 0);
        });
    $('.hoax-button').click(function() {
        var that = $(this).prev();
        $.ajax({
            url: '/giveaway/accept',
            type: 'POST',
            success: function(data) {
                if(!data.success) {
                    $('.hoax-button').notify(data.msg, {position: 'left center', className :"error"});
                }
            }
        })
    });
    $('.chatSmileOpen').click(function() {
        $('.chatSmileWindow').toggle();
    });
    $('.smileClick').click(function() {
        $('#sendie').val($('#sendie').val()+' '+$(this).attr("incert"));  
    });
    $('.addbalBtn').click(function() {
        $.ajax({
            url: '/merchant',
            type: 'POST',
            dataType: 'json',
            data: {sum: $('#sumadd').val() },
            success: function (data) {
                if (data.status == 'success') {
                    document.location.href = data.url;
                }
                else {
                    if(data.msg) $(btn).notify(data.text, {position: 'bottom middle', className :"error"});
                }
            },
            error: function () {
                $(btn).notify("Произошла ошибка. Попробуйте еще раз", {position: 'bottom middle', className :"error"});
            }
        });
    });
    /*$('.create-promo').click(function() {
        var that = $(this).prev();
        $.ajax({
            url: '/promo/create',
            type: 'POST',
            dataType: 'json',
            data: {code: $('.promo-create-text').val() },
            success: function (data) {
                if (data.success) {
                    that.notify(data.text, {autoHideDelay: 1000,position: 'bottom middle', className :"success"});
                }
                else {
                    if(data.text) that.notify(data.text, {position: 'bottom middle', className :"error"});
                }
            },
            error: function () {
                that.notify("Произошла ошибка. Попробуйте еще раз", {position: 'bottom middle', className :"error"});
            }
        });
        return false;
    });
    $('.accept-promo').click(function() {
        var that = $(this).prev();
        $.ajax({
            url: '/promo/accept',
            type: 'POST',
            dataType: 'json',
            data: {code: $('.promo-accept-text').val()},
            success: function (data) {
                if (data.success) {
                    that.notify(data.text, {autoHideDelay: 1000,position: 'top middle', className :"success"});
                }
                else {
                    if(data.text) that.notify(data.text, {position: 'top middle', className :"error"});
                }
            },
            error: function () {
                that.notify("Произошла ошибка. Попробуйте еще раз", {position: 'top middle', className :"error"});
            }
        });
        return false;
    });*/
    $('.save-link, .save-link2').click(function () {
        var that = $(this).prev();
        $.ajax({
            url: '/settings/save',
            type: 'POST',
            dataType: 'json',
            data: {trade_link: $(this).prev().val()},
            success: function (data) {
                if (data.status == 'success') {
                    that.notify(data.msg, {autoHideDelay: 1000,position: 'left middle', className :"success"});
                    $('.no-link').attr('href', '/deposit').removeClass('.no-auth').off('click');
                    setTimeout( function() {
                        $('.linkMsg').addClass('msgs-not-visible');
                    }, 1500);
                }
                else {
                    if(data.msg) that.notify(data.msg, {position: 'left middle', className :"error"});
                }
            },
            error: function () {
                that.notify("Произошла ошибка. Попробуйте еще раз", {position: 'left middle', className :"error"});
            }
        });
        return false;
    });


    $(document).on('click', '#checkHash', function () {
        var hash = $('#roundHash1').val();
        var number = $('#roundNumber1').val() || '';
        var bank = $('#roundPrice1').val() || 0;
        if (hex_md5(number) == hash) {
            var n = Math.floor(bank * parseFloat(number));
            $(this).notify('Хэш Раунда и Число Раунда верны.<br/> ПОБЕДНЫЙ БИЛЕТ - ' + n, {position: 'left middle', className :"success"});
        }
        else {
            $(this).notify('Хэш Раунда и Число Раунда не совпадают.', {position: 'left middle', className :"error"});
        }
    });
    if(GAME_MODE == 'duel'){
        loadActiveDuels();
        $(document).on('click','.coin',function () {
            $('.coin.choosen').removeClass('choosen');
            $(this).addClass('choosen');
        });
        $(document).on({
            mouseenter: function () {
                $(this).siblings('.btn.right span.left.prices').css('background-color','#236235');
                $(this).siblings('.btn.right span.left.icon .slant-left').css('border-color','#236235');
                $(this).addClass("hover-item");
            },
            mouseleave: function () {
                $(this).siblings('.btn.right span.left.prices').css('background-color','#3faa5d');
                $(this).siblings('.btn.right span.left.icon .slant-left').css('border-color','#3faa5d');
                $(this).removeClass("hover-item");
            }
        }, ".item");
        $(document).on('click','.btnReadyDeposit',function(){
            var items = [];
            var totalPrice = 0;
            $('.pot .item').each(function(){
                totalPrice += parseFloat($(this).data('price'));
                items.push($(this).data('id'));
            });
            if(items.length > 15) {
                $(this).notify('Вы выбрали больше 15 предметов!', {position: 'bottom middle', className :"error"});

            } else
            if(duel_deposit_state == 'join_room' && (totalPrice > parseFloat($('#max_price').html()) || totalPrice < parseFloat($('#min_price').html()))) {
                $(this).notify('Вы выбрали не верную сумму!', {position: 'bottom middle', className :"error"});
            } else if(duel_deposit_state == 'join_room') {
                var id = $('#duel_join_room').data('roomId');
                $('#potItems').html('<div style="left: 20px; top:20px;" class="loader-inner ball-clip-rotate-multiple blue-loader"> <div></div><div></div></div>');
                $.ajax({
                    url: '/duel/receiveOffer',
                    type: 'POST',
                    dataType: 'json',
                    data: { type: 'joinRoom', items: JSON.stringify(items), id: id },
                    success:function (data) {
                        if(data.success) {
                        }else{
                            $('#potItems').html('<h1 style="color: red;">'+data.error+'</h1>');
                            // $('<div title="Ошибка входа"><p>'+data.error+'</p></div>').dialog();
                        }
                    },
                    error:function () {
                        $('<div title="Ошибка"><p>Ошибка аякс!</p></div>').dialog();
                    }
                });
                //$('#deposit').arcticmodal('close');
            } else if(totalPrice < DUEL_MIN_PRICE) {
                $(this).notify('Минимальная сумма для создания комнаты '+DUEL_MIN_PRICE+' рублей.', {position: 'bottom middle', className :"error"});
            } else {
                var coin = $('.coin.choosen').data('coin');
                $('#potItems').html('<div style="left: 20px; top:20px;" class="loader-inner ball-clip-rotate-multiple blue-loader"> <div></div><div></div></div>');
                $.ajax({
                    url: '/duel/receiveOffer',
                    type: 'POST',
                    dataType: 'json',
                    data: { type: 'createRoom', items: JSON.stringify(items), coin: coin },
                    success:function (data) {
                        if(data.success) {
                        }else{
                            $('#potItems').html('<h1 style="color: red;">'+data.error+'</h1>');
                        }
                    },
                    error:function () {
                        $('<div title="Комната"><p>Ошибка аякс!</p></div>').dialog();
                    }
                });
                // $('#deposit').arcticmodal('close');
            }
        });
        $(document).on('click','.inventory .item',function(){
            if(parseInt($('#pot_count_items').html())>=15){
                $(this).notify('Вы выбрали 15 предметов, больше нельзя!!', {position: 'bottom middle', className :"error"});
                return;
            }
            $('#pot_count_items').html(parseInt($('#pot_count_items').html()) + 1);
            $(this).appendTo('#potItems');
            $('#pot_total_price').html((parseFloat($('#pot_total_price').html()) + parseFloat($(this).data('price'))).toFixed(2));

            if (duel_deposit_state == 'join_room') {
                if (parseFloat($('#pot_total_price').html()) > parseFloat($('#max_price').html()) || parseFloat($('#pot_total_price').html()) < parseFloat($('#min_price').html())) {
                    $('#pot_total_price').css('color', 'red');
                    $('.btnReadyDeposit').css('background-color','red');
                } else {
                    $('#pot_total_price').css('color', 'green');
                    $('.btnReadyDeposit').css('background-color','#5cb775');
                }
            } else {
                if (parseFloat($('#pot_total_price').html()) <DUEL_MIN_PRICE) {
                    $('#pot_total_price').css('color', 'red');
                    $('.btnReadyDeposit').css('background-color','red');
                } else {
                    $('#pot_total_price').css('color', 'green');
                    $('.btnReadyDeposit').css('background-color','#5cb775');
                }
            }

        });
        $(document).on('click','.pot .item',function(){
            $(this).appendTo('#itemsPlace');
            $('#pot_count_items').html(parseInt($('#pot_count_items').html()) - 1);
            $('#pot_total_price').html((parseFloat($('#pot_total_price').html()) - parseFloat($(this).data('price'))).toFixed(2));
            if (duel_deposit_state == 'join_room') {
                if (parseFloat($('#pot_total_price').html()) > parseFloat($('#max_price').html()) || parseFloat($('#pot_total_price').html()) < parseFloat($('#min_price').html())) {
                    $('#pot_total_price').css('color', 'red');
                    $('.btnReadyDeposit').css('background-color','red');
                } else {
                    $('#pot_total_price').css('color', 'green');
                    $('.btnReadyDeposit').css('background-color','#5cb775');
                }
            } else {
                if (parseFloat($('#pot_total_price').html()) < DUEL_MIN_PRICE) {
                    $('#pot_total_price').css('color', 'red');
                    $('.btnReadyDeposit').css('background-color','red');
                } else {
                    $('#pot_total_price').css('color', 'green');
                    $('.btnReadyDeposit').css('background-color','#5cb775');
                }
            }
        });
        $(document).on('click','.btnShowInv',function () {
            $('#deposit').arcticmodal();
            $('#potItems').html('');
            $('#inv_loader').show();
            $('#pot_count_items').html(0);
            $('#duel_create_room').show();
            $('#duel_join_room').hide();
            $('#pot_total_price').html(0);
            duel_deposit_state = 'create_room';
            loadMyDuelInventory();
            /*
             $('#joinRoom').hide();
             $('#createRoom').show();
             $('.inv_table_duel').html('');
             loadMyDuelInventory();
             $('.inv_count').html(0);
             $('.inv_price').html(0);
             $('.window').show();*/
        });
        $(document).on('click','.cfRoundJoin',function () {
            $('#deposit').arcticmodal();
            $('#potItems').html('');
            $('#inv_loader').show();
            $('#pot_count_items').html(0);
            $('#pot_total_price').html(0);
            $('#duel_create_room').hide();
            $('#duel_join_room').show();
            duel_deposit_state = 'join_room';
            $('#duel_join_room').data('roomId',$(this).data('id'));
            $('#min_price').html(parseFloat(($(this).data('price'))*0.9).toFixed(2));
            $('#max_price').html(parseFloat(($(this).data('price'))*1.1).toFixed(2));
            loadMyDuelInventory();
            /*
             $('#joinRoom').show();
             $('#joinRoom').data('roomId',$(this).data('id'));
             $('#room_start').html(parseFloat(($(this).data('price'))*0.9).toFixed(2));
             $('#room_end').html(parseFloat(($(this).data('price'))*1.1).toFixed(2));
             $('#createRoom').hide();
             $('.inv_table_duel').html('');
             loadMyDuelInventory();
             $('.inv_count').html(0);
             $('.inv_price').html(0);
             $('.window').show();*/
        });
        $(document).on('click','.cfRoundView',function () {
            var id = $(this).data('id');
            loadViewRoom(id);
        });
    }
    setInterval(function () {
        updateGameStats();
    },5000);
});
/*
 Reload site stats
 */
function updateGameStats(){
    $.ajax({
        url: '/api/getGameStats',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $('.stats-gamesToday').html(data.gamesToday);
            $('.stats-uniqueUsers').html(data.usersToday);
            $('.stats-wintoday').html(data.maxwinToday+' руб.');
        }
    });
}

function getRarity(type) {
    var rarity = '';
    var arr = type.split(',');
    if (arr.length == 2) type = arr[1].trim();
    if (arr.length == 3) type = arr[2].trim();
    if (arr.length && arr[0] == 'Нож') type = '★';
    switch (type) {
        case 'Армейское качество':      rarity = 'milspec'; break;
        case 'Запрещенное':             rarity = 'restricted'; break;
        case 'Засекреченное':           rarity = 'classified'; break;
        case 'Тайное':                  rarity = 'covert'; break;
        case 'Ширпотреб':               rarity = 'common'; break;
        case 'Промышленное качество':   rarity = 'common'; break;
        case '★':                       rarity = 'rare'; break;
        case 'card':                    rarity = 'card'; break;
    }
    return rarity;
}

function n2w(n, w) {
    n %= 100;
    if (n > 19) n %= 10;

    switch (n) {
        case 1: return w[0];
        case 2:case 3:case 4: return w[1];
        default: return w[2];
    }
}
function lpad(str, length) {
    while (str.toString().length < length)
        str = '0' + str;
    return str;
}

function replaceLogin(login) {
    var reg = new RegExp(BANNED_DOMAINS, 'i');
    return login.replace(reg, "itemup.ru");
}

function loadActiveDuels(){
    $.ajax({
        url: '/duel/getActiveGames',
        type: 'POST',
        data: {},
        success: function (data) {
            $('#roomList').html(data);
        }
    });
}

if (START) {
    //chat controller, todo move js file to new
    var messageList = $('#chat_messages');
    var messageField = $('#sendie');
    var lastMsg = '';
    var lastMsgTime = '';
    $('#chatScroll').css('height', $(window).innerHeight() - 120);
    $('#chatScroll').perfectScrollbar();
    function sendMessage() {
        var message = messageField.val();
        var maxlength = 200;
        if (message.length > maxlength) {
            $.notify('Максимум 200 символов');
            return;
        }
        message = message.trim();
        if (!message) {
            $.notify('Вы ничего не ввели!');
            return;
        }
        if (lastMsgTime && new Date - lastMsgTime < 1000 * 5) {
            $.notify('1 сообщение в 5 секунд');
            return;
        }
        lastMsgTime = new Date;
        lastMsg = message;
        $.ajax({
            url: '/ajax/chat',
            type: "POST",
            data: {
                'type': 'push',
                'message': message
            },
            success: function(data) {
                if(!data.success) {
                    $.notify(data.text);
                    return;
                }
                messageField.val('');
            }
        });
    }
    $('#chatScroll').on('click', '.removeMSG',function() {
        self = this;
        $.ajax({
            url: '/ajax/chat',
            type: "POST",
            data: {
                'type': 'remove',
                'id': $(self).attr('data-ids'),
                'steamid': $(self).attr('data-steamids')
            },
            success: function(data) {
                if(!data.success) {
                    $.notify(data.text);
                    return;
                }
                var steamId = $(self).attr('data-steamids');
                $.each($('.removeMSG').get().reverse(),function(){
                    self = this;
                    if ($(self).attr('data-steamids') == steamId)
                        $.ajax({
                            url: '/ajax/chat',
                            type: "POST",
                            data: {
                                'type': 'remove',
                                'id': $(self).attr('data-ids'),
                                'steamid': $(self).attr('data-steamids')
                            },
                            success: function(data) {
                                if(!data.success) {
                                    $.notify(data.text);
                                    return;
                                }
                            }
                        });
                });
            }
        });
        return false;
    });

    messageField.keypress(function (e) {
        if (e.keyCode == 13) {
            sendMessage();
            return false;
        }
    });
    // end chat
    var socket = io.connect(SOCKET_URL);
    socket
        .on('connect', function () {
            $('#loader').hide();
        })
        .on('disconnect', function () {
            $('#loader').show();
        })
        .on('chat.message',function (data) {
            data = JSON.parse(data);
            var a = $("#chatScroll")[0];
            var isScrollDown = Math.abs((a.offsetHeight + a.scrollTop) - a.scrollHeight) < 5;
            //GET DATA
            var username = data.username || "Error";
            var message = data.message;
            var avatar = data.avatar;
            var steamid = data.steamid;
            console.log(data);
            if(data.is_moderator == "1") {
                username = 'Модератор ('+username+')';
            }
            //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
            var messageElement = $("<div class='chatMessage clearfix' data-uuid='"+data.key+"'>");
            var msg = $('<div class="body"></div>');
            var nameElement = $("<a href='#' class='login'></a>");
            var avatarElement = $("<img class='removeMSG' data-ids='"+data.key+"' data-steamids='"+data.steamid+"' style='height: 32px; width: 32px;' />");
            avatarElement.attr('src', avatar);
            nameElement.attr('data-profile', steamid);
            if(data.is_vip == "1") {
                nameElement.attr('style', 'color:orange;');
            }
            if(data.is_moderator == "1") {
                nameElement.attr('style', 'color:green;');
            }
            msg.text(message);
            nameElement.text(username);
            messageElement.html(msg).prepend(nameElement).prepend(avatarElement);


            messageList.append(messageElement);
            if (isScrollDown) a.scrollTop = a.scrollHeight;
            $("#chatScroll").perfectScrollbar('update');
        })
        .on('delete.chat.message',function(data){
            $('.chatMessage[data-uuid='+data+']').remove();
            $("#chatScroll").perfectScrollbar('update');
        })
        .on('online', function (data) {
            $('.stats-onlineNow').text(Math.abs(data));
        });
    if(GAME_MODE === 'classic') {
        socket
            .on('newDeposit', function (data) {
            data = JSON.parse(data);
            $('#bets').prepend(data.html);
            var username = $('#bet_' + data.id + ' .items-info .left .username').text();
            $('#bet_' + data.id + ' .items-info .left .username').text(replaceLogin(username));
            $('#roundBank').text(Math.round(data.gamePrice));
            $('.progressbar-text').html('Внесено ' + data.itemsCount + ' из 100 предметов');
            $('.progressbar-value').css('width', data.itemsCount + '%');
            console.log(data.chances);
            html_chances = '';
            data.chances = sortByChance(data.chances);
            data.chances.forEach(function (info) {
                if (USER_ID == info.steamid64) {
                    $('#myItems').text(info.items + n2w(info.items, [' предмет', ' предмета', ' предметов']));
                    $('#myChance').text(info.chance);
                    $('.myDepositButton').addClass('big').text('Внести еще предметов');
                    $('.sendMsg').addClass('msgs-not-visible');
                }
                $('.chance_' + info.steamid64).text('(' + info.chance + ' %)');
                html_chances += '<div class="block"><ul><li><span class="queue-ava"><span class="queue-col">' + info.chance + '%</span><img src="' + info.avatar + '" alt="" /></span></li></ul></div>';
            });

            $('#game-chances').removeClass('none');
            $('#game-chances').html(html_chances);
            var rand = randomInteger(1, 3);
            $('#newBet-' + rand)[0].play();
            ITEMUP.initTheme();
        })
            .on('newPlayer', function (data) {
                data = JSON.parse(data);
                $('.currentPlayer').text(data.players);
                $('#slider').lemmonSlider('addItem', {
                    item: '<li><img data-profile="' + data.user.steamid64 + '" src="' + data.user.avatar + '" /></li>',
                    prepend: true
                });
                $('.list_participant').prepend('<p><img src="' + data.user.avatar + '" /><a data-profile="' + data.user.steamid64 + '" href="#" class="ellipsis">' + data.user.username + '</a></p>');
            })
            .on('sliderLottery', function (data) {
                var users = data.players;
                $('.list-players li:eq(' + (users - 5) + ') img').attr('src', data.winner.avatar);
                $('.list-players li:eq(' + (users - 5) + ') img').attr('data-profile', data.winner.steamid64);

                $('#slider').trigger('slideTo', 0);
                setTimeout(function () {
                    $('#slider').trigger('slideTo', users - 6);
                    $('.list-players li:eq(' + (users - 5) + ')').css("border", "1px solid red");
                }, 1000);
            })
            .on('newLottery', function (data) {
                console.log(data)
                items = data.items;
                items = JSON.parse(items);
                if (!data.success) {
                    $('.hoax').addClass('none');
                    return;
                }
                else {
                    $('.hoax').removeClass('none');
                }
                $('.currentPlayer').text(0);
                $('.currentMax').text(data.max);
                $('.lotteryPrice').text(items.price);
                $('.lotteryName').text(items.market_hash_name);
                $('.lotteryImg').attr('src', 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/' + items.classid + '/200fx200f');
                $('.list_participant').html('');
                $('.list-players').html('');
            })
            .on('forceClose', function () {
                $('.forceClose').removeClass('msgs-not-visible');
            })
            .on('timer', function (time) {
                if (timerStatus) {
                    console.log(time);
                    timerStatus = false;

                    $('.gameEndTimer').empty().removeClass('not-active').countdown({seconds: time});
                }
            })
            .on('slider', function (data) {
                if (ngtimerStatus) {
                    ngtimerStatus = false;
                    var users = data.users;
                    users = mulAndShuffle(users, Math.ceil(110 / users.length));
                    users[6] = data.winner;
                    users[100] = data.winner;
                    html = '';
                    users.forEach(function (i) {
                        html += '<li><img src="' + i.avatar + '"></li>';
                    });

                    $('.ngtimer').empty().countdown({seconds: data.time});

                    $('.game-progress').addClass('none');
                    $('.details-wrap').addClass('none');
                    $('.gameCarousel').removeClass('none');

                    $('.all-players-list').html(html);
                    $('.win-price').text(data.game.price);
                    $('.wt-span').html('???');
                    $('.wn-span').html('???');
                    $('.wn-u').text('');
                    $('.all-players-list').removeClass('active0 active1 active2 active3 active4 active5 active6 active7');

                    var randoms = randomInteger(0, 7);
                    if (data.showSlider) {
                        setTimeout(function () {
                            console.log(randoms);
                            $('.all-players-list').addClass('active' + randoms);
                        }, 500);
                    }
                    var timeout = data.showSlider ? 10 : 0;
                    setTimeout(function () {
                        $('#roundNumber').text(data.round_number);
                        $('.notification_3').removeClass('msgs-not-visible');

                        $('.winner-ticket span').text('#' + data.ticket);
                        $('.winner-ticket u').text('(ВСЕГО: ' + data.tickets + ')');
                        $('.winner-name span').html('<a data-profile="' + data.winner.steamid64 + '" href="#"></a>');
                        $('.winner-name span a').text(replaceLogin(data.winner.username));
                        $('.winner-name u').text('(' + data.chance + '%)');
                    }, 1050 * timeout);
                }
            })
            .on('newGame', function (data) {
                $('#newGame')[0].play();
                $('.notification_3').addClass('msgs-not-visible');
                $('.game-progress').removeClass('none');
                $('.details-wrap').removeClass('none');
                $('.gameCarousel').addClass('none');
                $('.all-players-list').removeClass('active');
                $('#bets').html('');
                $('#myItems').text('0 предметов');
                $('#myChance').text(0);
                $('.stats-gamesToday').text(data.today);
                $('.stats-uniqueUsers').text(data.userstoday);
                $('.stats-wintoday').text(data.maxwin);
                $('#roundId').text(data.id);
                $('#roundBank').text(0);
                $('#roundHash').text(data.hash);
                $('.progressbar-text').html('Внесено 0 из 100 предметов');
                $('.progressbar-value').css('width', '0%');
                $('.gameEndTimer').addClass('not-active');
                $('#game-chances').html('');
                $('.sendMsg').addClass('msgs-not-visible');
              //  $('');
                timerStatus = true;
                ngtimerStatus = true;
            })
            .on('queue', function (data) {
                if (data) {
                    /*var n = false;
                     for (var i in data) {
                     if(USER_ID == data[i].steamid)
                     n = true;

                     }
                     if(n) {
                     $('.sendMsg').removeClass('msgs-not-visible');
                     }
                     else {
                     $('.sendMsg').addClass('msgs-not-visible');
                     }*/
                    var n = data.indexOf(USER_ID);
                    if (n !== -1) {
                        //$('.sendMsgu').text('Ваш депозит обрабатывается. Вы '+(n + 1)+' в очереди.');
                        $('.sendMsg').removeClass('msgs-not-visible');
                    }
                    else {
                        $('.sendMsg').addClass('msgs-not-visible');
                    }
                }
                /*if (data) {
                 var n = false;
                 var html = '';
                 for (var i in data) {
                 var item = data[i];
                 if(USER_ID == data[i].steamid)
                 n = true;

                 if(n)
                 html += '<li class="active">';
                 else
                 html += '<li>';
                 html += '<span class="queue-ava"><span class="queue-col">'+ (parseInt(i)+1) +'</span>';
                 html += '<img src="'+item.avatar+'" alt="" />';
                 html += '</span>';
                 html += '<span class="queue-in">';
                 html += '<span class="queue-name ellipsis">'+item.username+'</span>';
                 html += '<span class="queue-num">'+ (parseInt(i)+1) +' в очереди</span>';
                 html += '</span>';
                 html += '</li>';
                 }
                 if(n)
                 $('.queueMsg').removeClass('msgs-not-visible');
                 else
                 $('.queueMsg').addClass('msgs-not-visible');
                 $('.que').empty();
                 $('.que').html(html);
                 }
                 else {
                 $('.queueMsg').addClass('msgs-not-visible');
                 }*/
            })
            .on('depositDecline', function (data) {
                data = JSON.parse(data);
                if (data.user == USER_ID) {
                    clearTimeout(declineTimeout);
                    declineTimeout = setTimeout(function () {
                        $('.declineMsg').addClass('msgs-not-visible');
                    }, 1000 * 10)
                    $('.declineMsg').text(data.msg);
                    $('.queueMsg').addClass('msgs-not-visible');
                    $('.declineMsg').removeClass('msgs-not-visible');
                }
            });
    } else if (GAME_MODE == 'duel') {
        socket
        .on('duelMsg', function (data) {
            if (data.steamid == USER_ID) {
                $('#potItems').html('<h1 style="green">' + data.text + '</h1>');
            }
            //$('<div title="'+data.title+'"><p>'+data.text+'!</p></div>').dialog();
        })
            .on('newRoom', function (data) {
                data = JSON.parse(data);
                if (data.steamId == USER_ID) {
                    $('<div title="Комната"><p>Вы успешно подтвердили, ваша комната создана!</p></div>').dialog();
                }
                $('#roomList').prepend(data.html);
                $('tr#duelRoom' + data.roomId).addClass("animated zoomIn");
            })
            .on('newJoin', function (data) {
                data = JSON.parse(data);
                if ($('tr#duelRoom' + data.roomId))
                    $('tr#duelRoom' + data.roomId).replaceWith(data.html);
                else
                    $('#roomList').append(data.html);
                if (data.roomId == $('#duel_view_room').data('id')) {
                    loadViewRoom(data.roomId);
                }
            })
            .on('userLeftRoom', function (data) {
                data = JSON.parse(data);
                if ($('tr#duelRoom' + data.roomId))
                    $('tr#duelRoom' + data.roomId).replaceWith(data.html);
                else
                    $('#roomList').append(data.html);
                if (data.roomId == $('#duel_view_room').data('id')) {
                    loadViewRoom(data.roomId);
                }
            })
            .on('pre.finish.duel', function (data) {
                data = JSON.parse(data);
                if ($('tr#duelRoom' + data.roomId))
                    $('tr#duelRoom' + data.roomId).replaceWith(data.html);
                else
                    $('#roomList').append(data.html);
                if (data.roomId == $('#duel_view_room').data('id')) {
                    loadViewRoom(data.roomId);
                }
            })
            .on('show.duel.winner', function (data) {
                data = JSON.parse(data);
                if (data.roomId == $('#duel_view_room').data('id')) {
                    loadViewRoom(data.roomId);
                }
                if ($('tr#duelRoom' + data.roomId))
                    $('tr#duelRoom' + data.roomId).replaceWith(data.html);
                else
                    $('#roomList').append(data.html);
                setTimeout(function () {
                    $('tr#duelRoom' + data.roomId).remove();
                }, 16000);
            });
    }
    var declineTimeout,
        timerStatus = true,
        ngtimerStatus = true,
        lotteryTimerStatus = true;
}
function loadMyInventory() {
    $.ajax({
        url: '/ajax',
        type: 'POST',
        dataType: 'json',
        data: { action: 'myinventory' },
        success: function (data) {
            console.log(data);
            $('.inv_cash').html('Загрузка инвентаря...');
            var totalPrice = 0;

            if (!data.success && data.Error) $('.inv_cash').html('Произошла ошибка. Попробуйте еще раз');

            if (data.success && data.rgInventory && data.rgDescriptions) {
                text = '';
                var items = mergeWithDescriptions(data.rgInventory, data.rgDescriptions);
                console.table(items);
                items.sort(function(a, b) { return parseFloat(b.price) - parseFloat(a.price) });
                _.each(items, function(item) {
                    totalPrice += parseFloat(item.price);
                    item.price = item.price;
                    item.image = 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/'+item.classid+'/200fx200f';
                    item.market_name = item.market_name || '';
                    text += ''
                    +'<div class="inv_table_info fadeInDown animated ' + getRarity(item.type) + '">'
                    +'<div class="type1"><div><img src="'+item.image+'" alt="" /></div>'+item.name+'</div>'
                    +'<div class="type2">'+(item.market_name.replace(item.name,'').replace('(','').replace(')','') || "Не определено")+'</div>'
                    +'<div class="type3">'+(item.price || '0.00')+'руб.</div>'
                    +'</div>'
                });
                $('.inv_cash').html('Общая стоимость вашего инвентаря: <b>'+totalPrice.toFixed(2) +'</b><span>руб.</span>');
                $('.inv_table').show();
            }

            $('.inv_table').append(text);
        },
        error: function (data) {
            console.log(data);
            $('.inv_cash').html('Произошла ошибка. Попробуйте еще раз');
        }
    });
}
var duel_deposit_state = 'create_room';
function loadViewRoom(id){
    $.ajax({
        url: '/duel/viewRound',
        type: 'POST',
        dataType: 'json',
        data: { id: id },
        success:function (data) {
            if(data.success) {
                $('#duel_view_room').html(data.html);
                $('#duel_view_room').data('id',id);
                $('#modal_view_room').arcticmodal();
            }else{
                $('<div title="Просмотр № '+id+'"><p>Ошибка:'+data.error+'</p></div>').dialog();
            }
        },
        error:function () {
            $('<div title="Ошибка"><p>Ошибка AJAX. Попробуйте позже!</p></div>').dialog();
        }
    });
}
function loadDuelHistory(){
    $.ajax({
        url: '/ajax/getDuelHistory',
        type: 'POST',
        data:{},
        success: function(data){
            $('#roomHistoryList').html(data);
            $('#historyModal').arcticmodal();
        },
        error: function(data){
            console.log(data);
            alert('Ошибка загрузки истории дуэлей!');
        }
    });
}
function loadMyDuelHistory(){
    $.ajax({
        url: '/ajax/getDuelHistory',
        type: 'POST',
        data:{ my_history: 1 },
        success: function(data){
            $('#roomHistoryList').html(data);
            $('#historyModal').arcticmodal();
        },
        error: function(data){
            console.log(data);
            alert('Ошибка загрузки истории дуэлей!');
        }
    });
}
function loadMyDuelInventory() {
    $.ajax({
        url: '/ajax',
        type: 'POST',
        dataType: 'json',
        data: { action: 'myinventory' },
        success: function (data) {
            console.log(data);
            $('#itemsPlace').html('');


            if (!data.success && data.Error) $('.inv_cash').html('Произошла ошибка. Попробуйте еще раз');
            var totalPrice = 0;
            if (data.success && data.rgInventory && data.rgDescriptions) {
                var text = '';

                var items = mergeWithDescriptions(data.rgInventory, data.rgDescriptions);
                //console.table(items);
                items.sort(function(a, b) { return parseFloat(b.price) - parseFloat(a.price) });
                _.each(items, function(item) {
                    if(item.type.indexOf('Container') != -1)
                        return;
                    item.price = parseFloat(item.price);
                    if(item.price < 1 || !parseInt(item.tradable)) return;
                    totalPrice += item.price;
                    item.image = 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/'+item.classid+'/110x78';
                    item.market_name = item.market_name || '';
                    text += '<div data-id="'+item.id+'" data-price="'+item.price+'" class="item"><div class="btn right"><span class="left icon"><span class="slant-left"></span></span><span data-ng-bind="item.priceView" class="left prices ng-binding">'+item.price+'</span><span class="right icon"><span class="slant-right"></span></span></div><img src="'+item.image+'"><div class="title text-center"><span  class="ng-binding">'+item.market_name+'</span></div></div>';
                    //text += '<div data-name="'+item.market_name+'" data-id="'+item.id+'" data-price="'+item.price+'" class="inv_d_item"><img width="50" height="50" src="'+item.image+'"></div>';
                   /* text += ''
                        +'<div class="inv_table_info fadeInDown animated ' + getRarity(item.type) + '">'
                        +'<div class="type1"><div><img src="'+item.image+'" alt="" /></div>'+item.name+'</div>'
                        +'<div class="type2">'+(item.market_name.replace(item.name,'').replace('(','').replace(')','') || "Не определено")+'</div>'
                        +'<div class="type3">'+(item.price || '0.00')+'руб.</div>'
                        +'</div>'*/
                });
            }
            $('#inv_loader').hide();
            $('#itemsPlace').html(text);
            $('#inv_price').html(totalPrice.toFixed(2));
        },
        error: function (data) {
            console.log(data);
            $('.inv_cash').html('Произошла ошибка. Попробуйте еще раз');
        }
    });
}
function mergeWithDescriptions(items, descriptions) {
    return Object.keys(items).map(function(id) {
        var item = items[id];
        var description = descriptions[item.classid + '_' + (item.instanceid || '0')];
        for (var key in description) {
            item[key] = description[key];

            delete item['icon_url'];
            delete item['icon_drag_url'];
            delete item['icon_url_large'];
        }
        return item;
    })
}
function mulAndShuffle(arr, k) {
    var
        res = [],
        len = arr.length,
        total = k * len,
        rand, prev;
    while (total) {
        rand = arr[Math.floor(Math.random() * len)];
        if (len == 1) {
            res.push(prev = rand);
            total--;
        }
        else if (rand !== prev) {
            res.push(prev = rand);
            total--;
        }
    }
    return res;
}

$('.tabs_button').on('click', 'li:not(.active)', function() {
    $(this)
    .addClass('active').siblings().removeClass('active')
    .closest('.tabs').find('.tabs_info').removeClass('active').eq($(this).index()).addClass('active');
});
$(document).on('click', '.vote', function() {
    var that = $(this);
    $.ajax({
        url: '/ajax',
        type: 'POST',
        dataType: 'json',
        data: { action: 'voteUser', id: $(this).data('profile') },
        success: function(data) {
            if (data.status == 'success') {
                $('#myProfile').find('.votes').text(data.votes || 0);
            }
            else {
                if (data.msg) that.notify(data.msg, {position: 'bottom middle', className :"error"});
            }
        },
        error: function() {
            that.notify("Произошла ошибка. Попробуйте еще раз", {position: 'bottom middle', className :"error"});
        }
    });
});
    $(document).on('click', '.depositCardBtn, ._carts', function () {
        $.post('https://itemup.ru/getBalance', function (data) {
            console.log(data);
            $('#balanced').text(data);
        });

        $('#upCards').arcticmodal();

        //updateCards();

        return false;
    });
$(document).on('click', '[data-profile]', function() {
    var modal = $('#myProfile');
    modal.find('.loading').show();
    modal.find('.tabs').hide();
    modal.arcticmodal();

    var id = $(this).data('profile');
    $.ajax({
        url: '/ajax',
        type: 'POST',
        dataType: 'json',
        data: { action: 'userInfo', id: id },
        success: function(data) {
            if(id != USER_ID) {
                $('.settingskey, .tabs_link').addClass('none');
            }
            else {
                $('.settingskey, .tabs_link').removeClass('none');
            }
            modal.find('.login span').text(replaceLogin(data.username));
            modal.find('.games span').text(data.games);
            modal.find('.wins span').text(data.wins);
            modal.find('.winrate span').text(data.winrate + '%');
            modal.find('.totalBank span').text(data.totalBank + ' руб');
            modal.find('.votes').text(data.votes || 0);
            modal.find('.profile a').attr('href', data.url).text(data.url);
            modal.find('img').attr('src', data.avatar);

            var html = '';
            data.list.forEach(function(game) {
                if (game.win)
                    status = 'profile_history_win';
                else
                    status = 'profile_history_lose';

                html += '<div class="profile_history '+status+'">';
                html += '<div class="hist1">'+game.id+'</div>';
                html += '<div class="hist2">'+ game.chance + '%</div>';
                html += '<div class="hist3">'+ game.bank +'р.</div>';
                if (game.win == -1) html += '<div class="hist4">Не завершена</div>';
                else if (game.win) html += '<div class="hist4">Победа</div>';
                else html += '<div class="hist4">Проигрыш</div>';
                html += '<div class="hist5"><a href="/game/'+game.id+'">Посмотреть игру</a></div>';
                html += '</div>';
            });
            console.log(data.list);
            modal.find('.games-list').html(html);

            modal.find('.vote').data('profile', id);

            modal.find('.loading').hide();
            modal.find('.tabs').show();

            if (modal.find('.games-list').is('.ps-container')) modal.find('.games-list').perfectScrollbar('destroy');
            modal.find('.games-list').perfectScrollbar();
        },
        error: function() {
            $.notify("Произошла ошибка. Попробуйте еще раз", {className :"error"});
        }
    });
    return false;
});
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
/*function updateChat() { 
    $('.info-md5').css('margin', '0 180px');
    $('.stats').css('margin', '16px auto 18px 70px');
    $('.information').css('margin', '0 auto 25px 70px');
    $('.gf').css('margin', '0 70px');
    $('.hf').css('margin', '0 auto');
    $('.bc').css('margin', '10px auto 0 70px');
}*/
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function sortByChance(arrayPtr){
    var temp = [],
        item = 0;
    for (var counter = 0; counter < arrayPtr.length; counter++)
    {
        temp = arrayPtr[counter];
        item = counter-1;
        while(item >= 0 && arrayPtr[item].chance < temp.chance)
        {
            arrayPtr[item + 1] = arrayPtr[item];
            arrayPtr[item] = temp;
            item--;
        }
    }
    return arrayPtr;
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}