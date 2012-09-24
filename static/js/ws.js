/**
* ws
* 	- handles the WebSocket portion of the application on the client side
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
