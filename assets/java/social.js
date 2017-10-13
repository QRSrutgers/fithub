var chosen;
var nameOfEvent = [];
var timeEvent = [];
var linkForEvent = [];
var timeEventNew = [];
var convertedTime = [];


$(".event-selection").on("click", function() {
    $("#event").html("");
    nameOfEvent = [];
    convertedTime = [];
    linkForEvent = [];
    timeEvent = [];
    timeEventNew = [];

    chosen = $(this).attr("value");

    var queryURL =
        "https://cors-anywhere.herokuapp.com/https://api.meetup.com/recommended/events?&sign=true&photo-host=public&zip=07834&page=20&topic_category=" + chosen + "&key=555640661059337510695f1732630"


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            for (var i = 0; i < 5; i++) {
                timeEvent.push(response[i].time);
                nameOfEvent.push(response[i].name);
                linkForEvent.push(response[i].link);
                timeEventNew.push(moment(timeEvent[i], "X"));
                convertedTime.push((moment(timeEventNew[i]).format("H:HH, MM/DD")));

                $("#event").append("<div>Meetup Event: " + nameOfEvent[i] + "</div><div>Start Time (24hrs): " + convertedTime[i] + "</div><div>Link for event page: <a href='" + linkForEvent[i] + "' target='_blank'>I'll take you there</a></div><br>");

            }

        });
});