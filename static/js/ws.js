/**
* ws
*   - handles the WebSocket portion of the application on the client side
*/
ws = new WebSocket('ws://' + location.host + '/api/websocket');

ws.onopen = function() {
    $.getJSON(location.protocol + '//' + location.host + '/api/toast', function(data) {
        $.each(data, function(key, value){
            appendToast(value['_id'], value.message, value.drink, value.timestamp, value.location);
            if (value['_id'] < last_id)
                last_id = value['_id'];
        });
    });
};

ws.onmessage = function(event) {
    var data = $.parseJSON(event.data);
    prependToast(data["_id"], data.message, data.drink, data.timestamp, data.location);
};
