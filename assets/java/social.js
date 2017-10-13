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
    // displayTime = [];

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

                nameOfEvent.push(response[i].name);

                linkForEvent.push(response[i].link);
                    console.log("link" + linkForEvent);

                var day = moment.unix(response[i].time/1000).format("MM/DD/YYYY");
                console.log("Day:" + day);

                timeEvent.push(moment.unix(response[i].time/1000));
                    console.log("Time Event:" + timeEvent);

                timeEventNew.push(moment(timeEvent[i], "X"));

                    console.log("TimeEventNew:" + timeEventNew);

                convertedTime.push(moment(timeEventNew[i]).format("MM/DD/YYYY, HH:MM"));
                    console.log("Converted time:" + convertedTime);

                 // displayTime.push(convertedTime);
                 //    console.log("Displayed Time:" + displayTime);   
                $("#event").append("<div>Meetup Event: " + nameOfEvent[i] + "</div><div>Date & Time (24hrs): " + convertedTime[i] + "</div><div>Link for event page: <a href='" + linkForEvent[i] + "' target='_blank'>I'll take you there</a></div><br>");

            }

        });
});