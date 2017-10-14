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
                    for (var i = 0; i < 5; i++) {


                        nameOfEvent.push(response[i].name);

                        linkForEvent.push(response[i].link);

                        var day = moment.unix(response[i].time / 1000).format("MM/DD/YYYY");

                        timeEvent.push(moment.unix(response[i].time / 1000));

                        timeEventNew.push(moment(timeEvent[i], "X"));

                        convertedTime.push(moment(timeEventNew[i]).format("MM/DD/YYYY, HH:MM"));

                        convertedTime.push(moment(timeEventNew[i]).format("MM/DD/YYYY, HH:MM"));

                        $("#event").append("<div>Meetup Event: " + nameOfEvent[i] + "</div><div>Date & Time (24hrs): " + convertedTime[i] + "</div><div>Link for event page: <a href='" + linkForEvent[i] + "' target='_blank'>I'll take you there</a></div><br>");

                    }

                });
        });