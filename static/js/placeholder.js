/**
* placeholder
*   - replaces placeholder text of form with various messages on each page load
*/
$(document).ready(function(){
    var whylist = ["I subsist by feeding on the life essence of living creatures, regardless of whether they are undead or a living person/being.",
                "I am thirsty.",
                "I lost a bet.",
                "I want to be as cool as Nelly.",
                "a lot o' lovely booty be pleasing to me eyes. Argh!",
                "I'm a scaly Manfish.",
                "my dairy farm burned down.",
                "I like to drink."];
    var whatlist = ["Blood (A-positive)",
                "Water.",
                "Pickle Juice.",
                "Pimp Juice.",
                "Spiced Rum.",
                "Bailey's",
                "Melted Butter.",
                "beer."];
    var randindex =Math.floor(Math.random()*whylist.length);
    $('#why').attr("placeholder", whylist[randindex]);
    $('#what').attr("placeholder", whatlist[randindex]);
});