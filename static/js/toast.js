//sendToast function -- sends the information to the server via AJAX
function sendToast(event) {
    var message = $('#why').val();
    var drink = $('#what').val();
    var timestamp = new Date().toISOString();
    var toast = '{"message": "' + message + '", "drink": "' + drink + '", "timestamp": "' + timestamp + '"}';
    $.ajax({
        url: location.protocol + '//' + location.host + '/toast',
        dataType: 'json',
        type: 'POST',
        data: toast
    });
    ws.send(toast);
    clearToast();

}

//clearToast function -- clears the form (call when commit was successful)
function clearToast() {
    $('#why').val('');
    $('#what').val('');
}

//displayToast function -- add the toast to the html page
function displayToast(message, drink, timestamp) {
    console.log(timestamp);
    $('#toastBox').prepend('<div class="well well-large outshade"><p>' + message + '</p><p>' + drink + '</p><time class="timeago muted pull-right" datetime="' + timestamp + '"></time></div>');
    $("time.timeago").timeago();
}

//next part passes bind the button click to the sendToast
$('#toastButton').click(function() {
        sendToast(event);
});
