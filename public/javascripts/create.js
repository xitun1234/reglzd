var channelCreateNewAccount = "channelCreateNewAccount_" + Date.now() + Math.random().toString(36).substr(2, 9);

$(document).ready(function () {

    var pubnub = PUBNUB({
        subscribe_key: config.pubnubSubscribeKey
    });

    pubnub.subscribe({
        channel: channelCreateNewAccount,
        message: function (message) {
            console.log(message.log);
            $('#logCreate').append(message.log + "\n");
        }
    })

});

$('#btnCreateNewAccount').click(function () {
    let buttonDefaultText = $(this).text();
    let buttonElement = this;
    $(this).hide().html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Proccessing ...').fadeIn("slow");
    $(this).prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "create/createNewAccount",
        dataType: "json",
        contentType: "application/json",
        timeout: 100000,
        headers: {
            'channelproccess': channelCreateNewAccount
        },
        data: JSON.stringify({
            verifyAccount: $('#checkBoxVerifyAccount').is(":checked")
        }),
        success: function (result) {
            if (result.success) {
                $.notify(`${result.username}`, {
                    autoHideDelay: 300000,
                    className: 'success'
                });
            } else {
                $.notify(`${result.username}`, {
                    autoHideDelay: 300000,
                    className: 'error'
                });
            }

            $('#logCreate').append(`---Finish ${result.username}---\n`);
        },
    }).always(() => {
        $(buttonElement).removeAttr('disabled');
        $(buttonElement).hide().text(buttonDefaultText).fadeIn();
        $('#btnCreateNewAccount').click();
    });

});