// This file holds the javascript code of the core ajax queries that update the toasts
//Use the selector for the elements in the form to access the elements and send them via ajax


//sendToast function -- sends the information to the server via AJAX
function sendToast(event){
    message = $('#message').val();
    drink = $('#drink').val();
    timestamp = event.timeStamp;
    $.ajax({
        url: location.protocol + '//' + location.host + '/toast',
        type: 'POST',
        data: '{"message": "' + message + '", "drink": "' + drink + '", "timestamp": "' + timestamp + '"}',
        dataType: 'json'
    });

    var id = 'myid';
    displayToast(message, drink, timestamp, id);
    clearToast();
}

//clearToast function -- clears the form (call when commit was successful)
function clearToast(){
    $('#message').val('');
    $('#drink').val('');
}

//displayToast function -- add the toast to the html page
function displayToast(message, drink, timestamp, id){
    $('#toastBox').prepend('<p>id: ' + id + '</p><p>' + message + '</p><p>' + drink + '</p><p></p>');
}

//next part passes bind the button click to the sendToast
$('#toastButton').click(function(){
        console.log('made it here');
        sendToast(event);
    });