/**
*
* app.js
*
*/

ws = new WebSocket('ws://' + location.host + '/websocket');

ws.onopen = function() {
    $.getJSON(location.protocol + '//' + location.host + '/get/more_toast', function(data) {
        var json_data = data['data'];

        var length = json_data['num_toasts'];
        var toasts = json_data ['toasts'];

        for(var i = 0; i < length; i++) {
            toast = toasts['id' + (i + 1)];
            console.log(toast);
            displayToast(toast.message, toast.drink, toast.timestamp);
        }
    });
};

ws.onmessage = function(event) {
    var data = $.parseJSON(event.data);

    toast = data['data'];
    displayToast(toast.message, toast.drink, toast.timestamp);

};

//sendToast function -- sends the information to the server via AJAX
function sendToast(event) {
    var message = $('#message').val();
    var drink = $('#drink').val();
    var timestamp = event.timeStamp;
    var toast = '{"message": "' + message + '", "drink": "' + drink + '", "timestamp": "' + timestamp + '"}';
    $.ajax({
        url: location.protocol + '//' + location.host + '/post/toast',
        dataType: 'json',
        type: 'POST',
        data: toast
    });
    ws.send('{ "type": "new_toast", "data": ' + toast + '}');
    clearToast();

}

//clearToast function -- clears the form (call when commit was successful)
function clearToast() {
    $('#message').val('');
    $('#drink').val('');
}

//displayToast function -- add the toast to the html page
function displayToast(message, drink, timestamp) {
    $('#toastBox').prepend('<p>' + message + '</p><p>' + drink + '</p><p></p>');
}

//next part passes bind the button click to the sendToast
$('#toastButton').click(function() {
        sendToast(event);
    });
