var initAjaxToken = function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
};
$(document).ready(function() {
    initAjaxToken();
    $('.refreshBot').click(function(){
        $.ajax({
            url: '/admin/send/restartBot' ,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                if(data.success==true) {
                    alert('Бот успешно перезагружен!');
                } else {
                    alert('Ошибка перезагрузки бота : '+data.error);
                }
            },
            error: function(){
                alert('Ошибка AJAX. Попробуйте позже');
            }
        });
    });
    $('.fixDuelButton').click(function(){
        $.ajax({
            url: '/admin/send/fixDuel',
            type: 'POST',
            dataType: 'json',
            data: {
                id: $('#fixDuelId').val()
            },
            success: function(data) {
                if(data.success==true) {
                    alert('Запрос на фикс комнаты успешен!');
                } else {
                    alert('Ошибка фикса : '+data.error);
                }
            },
            error: function(){
                alert('Ошибка AJAX. Попробуйте позже');
            }
        });
    });
    $('.refreshPrice').click(function(){
            $.ajax({
                url: '/admin/send/refershPrice',
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    if(data.success== true)
                    {
                        alert('Цены в магазине успешно обновлены!!');
                    } else {
                        alert('Ошибка при обновлении цен в магазине!!');
                    }
                },
                error: function(){
                    alert('Ошибка AJAX. Попробуйте позже');
                }
            });
    });
    $('.sendWeekItems').click(function () {
        $.ajax({
            url: '/admin/send/resendWeek',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if(data.success === true) {
                    alert('Пересылка успешна! Переслано офферов: '+data.tradeoffer_count);
                } else {
                    alert('Ошибка : ' + data.error);
                }
            },
            error:function () {
                alert('Ошибка AJAX. Попробуйте позже!')
            }
        });
    });
    $('.sendWeekDuelItems').click(function () {
        $.ajax({
            url: '/admin/send/resendWeekDuel',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if(data.success === true) {
                    alert('Пересылка успешна! Переслано офферов: '+data.tradeoffer_count);
                } else {
                    alert('Ошибка : ' + data.error);
                }
            },
            error:function () {
                alert('Ошибка AJAX. Попробуйте позже!')
            }
        });
    });
    $('.sendComissionItems').click(function(){
        $.ajax({
            url: '/admin/send/comission',
            type: 'POST',
            dataType: 'json',
            data: {
                tradeoffer: $('#tradeoffer').val()
            },
            success: function (data) {
                if(data.success  === true) {
                    alert('Запрос на отправку комисии отправлен боту!');
                } else {
                    if(data.text) alert(data.text);
                }
            },
            error: function () {
                alert("Произошла ошибка попробуйте позже.")
            }
        });
    });
	$('.sendTrade').click(function() {
        $.ajax({
            url: '/admin/send/ajax',
            type: 'POST',
            dataType: 'json',
            data: {game: $('#sendid').val() },
            success: function (data) {
                if (data.type == 'success') {            
                   	alert('Запрошена повторная отправка выигрыша');
                }
                else {
                    if(data.text) alert(data.text);
                }
            },
            error: function () {
                alert("Произошла ошибка. Попробуйте еще раз");
            }
        });
    });
    $('.sendTradeDuel').click(function() {
        $.ajax({
            url: '/admin/send/ajaxDuel',
            type: 'POST',
            dataType: 'json',
            data: {game: $('#sendidduel').val() },
            success: function (data) {
                if (data.type == 'success') {
                    alert('Запрошена повторная отправка выигрыша');
                }
                else {
                    if(data.text) alert(data.text);
                }
            },
            error: function () {
                alert("Произошла ошибка. Попробуйте еще раз");
            }
        });
    });
    $('.sendTradeShop').click(function() {
        $.ajax({
            url: '/admin/send/ajaxShop',
            type: 'POST',
            dataType: 'json',
            data: {buy: $('#sendidshop').val() },
            success: function (data) {
                if (data.type == 'success') {            
                    alert('Запрошена повторная отправка товара');
                }
                else {
                    if(data.text) alert(data.text);
                }
            },
            error: function () {
                alert("Произошла ошибка. Попробуйте еще раз");
            }
        });
    });
    $('.sendPrize').click(function() {
        self = this;
        $.ajax({
            url: '/admin/send/ajaxShop',
            type: 'POST',
            dataType: 'json',
            data: {buy: $(self).attr('data-id') },
            success: function (data) {
                if (data.type == 'success') {            
                    alert('Запрошена повторная отправка товара');
                }
                else {
                    if(data.text) alert(data.text);
                }
            },
            error: function () {
                alert("Произошла ошибка. Попробуйте еще раз");
            }
        });   
    });
    $('#profile-btn').click(function() {
        $('#profile-modal').modal();
    });
    
    $("#example1").DataTable( {
        "lengthMenu": [ 100, 25, 50, 75, 1000 ],
        "order": [[ 4, "desc" ]]
    } );
    $("#example2").DataTable( {
        "order": [[ 1, "desc" ]]
    } );
});