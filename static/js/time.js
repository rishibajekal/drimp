/**
* time
* 	- calculates the "timeago" for each toast periodically
*/
$(document).ready(function(){
    setInterval(function(){
        $("time.timeago").timeago();
    }, 60000);
});