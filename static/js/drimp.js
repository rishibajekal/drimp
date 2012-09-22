/**
*
* app.js
*
*/

ws = new WebSocket('ws://' + location.host + '/websocket');

ws.onopen = function() {
    $.getJSON(location.protocol + '//' + location.host + '/toast', function(data) {

        $.each(data, function(key, value){
            displayToast(value.message, value.drink, value.timestamp);
        });
    });
};

ws.onmessage = function(event) {
    var data = $.parseJSON(event.data);

    displayToast(data.message, data.drink, data.timestamp);

};

//sendToast function -- sends the information to the server via AJAX
function sendToast(event) {
    var message = $('#message').val();
    var drink = $('#drink').val();
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
    $('#message').val('');
    $('#drink').val('');
}

//displayToast function -- add the toast to the html page
function displayToast(message, drink, timestamp) {
    $('#toastBox').prepend('<div class="well well-large"><p="lead">' + message + '</p><p="lead">' + drink + '</p><p class="pull-right">' + $.timeago(timestamp) + '</p></div>');
}

//next part passes bind the button click to the sendToast
$('#toastButton').click(function() {
        sendToast(event);
});
