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
    else {
        //print that the user needs to fill in both boxed
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
    $('#toastBox').prepend('<div class="well well-large"><time class="timeago muted pull-right" datetime="' + timestamp + '"></time><p>I am drinking because ' + message + '</p><p>I am drinking ' + drink + '</p></div>');
    $("time.timeago").timeago();
}

$('#toastButton').bind('click', function(event) {
    console.log(event);
        sendToast(event);
    /*
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $('#toastBox').offset().top
        }, 1000);
        event.preventDefault();
    */
});

// Allow enter to also do the submit
$('#what').keypress(function(event){
    if (event.keyCode == 13){
        event.preventDefault();
        sendToast();
    }
});

    
