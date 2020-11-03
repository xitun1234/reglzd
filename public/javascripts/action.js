$('#urlShop').change(function () {
    let urlShop = $(this).val()
    let shopIDFomURLReg = urlShop.match(/shopee\.vn\/(.*?)$/);
    if (shopIDFomURLReg) {
        let shopName = shopIDFomURLReg[1];
        $.ajax({
            type: "POST",
            url: "api/shopDetail",
            dataType: "json",
            data: {
                param: shopName,
                by: "username"
            },
            success: function (result) {
                $("#btnStartFollow").removeAttr("disabled");
                $("#urlShop").attr("shopID", result.shopID)
            },
        })
    }

});


$('#btnStartFollow').click(function () {
    let buttonDefaultText = $(this).text();
    let buttonElement = this;
    $(this).hide().html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Proccessing ...').fadeIn("slow");
    $(this).prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "action/followShop",
        dataType: "json",
        data: {
            shopID: $("#urlShop").attr("shopID"),
            amount: $("#amountFollowShop").val(),
        },
        success: function (result) {

            result.listFollow.forEach(element => {
                console.log(element);
                let msg = `${element} follow your shop`
                $.notify(msg, {
                    className : 'success',
                    autoHideDelay : 20000,
                });
            });
            
            $(buttonElement).removeAttr('disabled');
            $(buttonElement).hide().text(buttonDefaultText).fadeIn();
        },
    })
});


$('#btnGetCoinsEveryDay').click(function () {
    let buttonDefaultText = $(this).text();
    let buttonElement = this;
    $(this).hide().html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Proccessing ...').fadeIn("slow");
    $(this).prop("disabled", true);

    let listAccountGetCoins = $("#listAccountGetCoins").val().trim().replace(/^\s*\n/gm, "").split('\n');
    let promises = [];

    $.each(listAccountGetCoins, function (index, item) {
        let request = $.ajax({
            type: "POST",
            url: "action/getCoinsEveryDay",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                username: item.trim()
            }),
            success: function (result) {
                let msgLog = result.username;

                if (result.success) {
                    msgLog += ` ${result.increaseCoins} Coins - ${result.countDay} Day`
                    if (result.successCoins) {
                        $.notify(msgLog, 'success');
                    } else {
                        $.notify(msgLog, 'warn');
                    }
                } else {
                    msgLog += " Error"
                    $.notify(msgLog, 'error');
                }

                $('#logGetCoinsEveryday').append(msgLog + "\n");
            },
        });
        promises.push(request);
    })
    $.when.apply(null, promises).done(function () {
        $(buttonElement).removeAttr('disabled');
        $(buttonElement).hide().text(buttonDefaultText).fadeIn();
    });
});