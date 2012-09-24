/**
* sendToast
*   - sends the information to the server via AJAX
*/
function sendToast(event) {
    var message = $('#why').val();
    var drink = $('#what').val();
    var timestamp = new Date().toISOString();
    var toast = '{"message": "' + message + '", "drink": "' + drink + '", "timestamp": "' + timestamp + '"}';
    if (message !== '' && drink !== ''){
        $.ajax({
            url: location.protocol + '//' + location.host + '/toast',
            dataType: 'json',
            type: 'POST',
            data: toast
        });
        ws.send(toast);
        clearForm();
    }
}

/**
* clearToast
*   - clears the form upon successful submit
*/
function clearForm() {
    $('#why').val('');
    $('#what').val('');
}

/**
* displayToast
*   - add the toast to the page
*/
function displayToast(message, drink, timestamp) {
    console.log(timestamp);
    $('#toastBox').prepend('<div class="well well-large"><p>' + message + '</p><p>' + drink + '</p><time class="timeago muted pull-right" datetime="' + timestamp + '"></time></div>');
    $("time.timeago").timeago();
}

$('#toastButton').bind('click', function(event) {
        sendToast(event);

    /*
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $('#toastBox').offset().top
        }, 1000);
        event.preventDefault();
    */
});
