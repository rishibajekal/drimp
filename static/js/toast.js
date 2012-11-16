/**
* sendToast
*   - sends the information to the server via AJAX
*/
var last_id = Number.MAX_VALUE;

function sendToast(event) {
    var message = $('#why').val();
    var drink = $('#what').val();
    var timestamp = new Date().toISOString();
    var toast = '{"message": "' + message + '", "drink": "' + drink + '", "timestamp": "' + timestamp + '"}';

    // drink and message VALID
    if (message !== '' && drink !== '') {
            if (message.length > 200) {
                $("#why-group").addClass("error");
                $("#why-help").text("Please limit your message to 200 characters.");
            }
            else if (drink.length > 50) {
                $("#what-group").addClass("error");
                $("#what-help").text("Please limit your message to 50 characters.");
            }
            else {
                $.ajax({
                    url: location.protocol + '//' + location.host + '/api/toast',
                    dataType: 'json',
                    type: 'POST',
                    data: toast
                }).done(function(data) {
                    clearForm();
                    $('html, body').stop().animate({
                        scrollTop: $('#toastBox').offset().top - 113
                    }, 1000);
                    ws.send(JSON.stringify(data));
            });
        }
    }
    // message is VALID, drink is NOT VALID
    else if (message !== '' && drink === '') {
        $("#what-group").addClass("error");
        $("#what-help").text("Please write what you're drinking.");
        $('#what').attr("placeholder", "Tell us what you're drinking.");
        $('#what').focus();
    }
    // drink is VALID, message is NOT VALID
    else if (message === '' && drink !== '') {
        $("#why-group").addClass("error");
        $("#why-help").val("");
        $("#why-help").val("Please write why you're drinking.");
        $('#why').attr("placeholder", "Tell us why you're drinking.");
        $("#why").focus();
    }
}

/**
* clearToast
*   - clears the form upon successful submit
*/
function clearForm() {
    $('#why').val('');
    $('#what').val('');
    $("#why-help").text("");
    $("#what-help").text("");
    $("#why-group").removeClass("error");
    $("#what-group").removeClass("error");

    var randindex =Math.floor(Math.random()*whylist.length);
    $('#why').attr("placeholder", whylist[randindex]);
    $('#what').attr("placeholder", whatlist[randindex]);
}

/**
* displayToast
*   - add the toast to the page
*/
function prependToast(id, message, drink, timestamp, location) {
    $('#toastBox').prepend('<div id="' + id + '" class="mywell well well-large">' +
        '<p><span class="why_post muted">I am drinking because</span> <span class="big-text">'+ message +
        '</span></p><p><span class="what_post muted">I am drinking</span> <span class="big-text">' + drink +
        '</span></p><time class="timeago muted pull-right" datetime="' + timestamp +
        '"></time><span class="muted pull-left">' + location + '</span><br /></div>');
    $("time.timeago").timeago();
}

function appendToast(id, message, drink, timestamp, location) {
    $('#toastBox').append('<div id="' + id + '" class="mywell well well-large">' +
        '<p><span class="why_post muted">I am drinking because</span> <span class="big-text">'+ message +
        '</span></p><p><span class="what_post muted">I am drinking</span> <span class="big-text">' + drink +
        '</span></p><time class="timeago muted pull-right" datetime="' + timestamp +
        '"></time><span class="muted pull-left">' + location + '</span><br /></div>');
    $("time.timeago").timeago();
}

$('#toastButton').bind('click', function(event) {
        sendToast(event);
        var $anchor = $(this);
});

// Allow enter to also do the submit
$('#what,#why').keypress(function(event){
    if (event.keyCode == 13){
        event.preventDefault();
        sendToast();
    }
});

$(window).scroll(function() {
    if (last_id > 1 && document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight - 200 && document.documentElement.clientHeight > 500){
        $.getJSON(location.protocol + '//' + location.host + '/api/toast/' + last_id, function(data) {
            $.each(data, function(key, value){
                appendToast(value['_id'], value.message, value.drink, value.timestamp, value.location);
                if (value['_id'] < last_id)
                    last_id = value['_id'];
            });
        });
    }
});


