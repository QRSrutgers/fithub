// Capture Button Click for Your Hub
$("#save-changes-yourHub").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var cweight = $("#cweight").val().trim();
    var tweight = $("#tweight").val().trim();
    var comment = $("#comment-input").val().trim();

    // Console log each of the user inputs to confirm we are receiving them
    console.log(cweight);
    console.log(tweight);
    console.log(comment);

    // Replaces the content in the div with the new info
    $("#cweight-display").text(cweight);
    $("#tweight-display").text(tweight);
    $("#comment-display").html("<div>" + comment + "</div>");

    // Clear localStorage
    //localStorage.clear();
    localStorage.removeItem("cweight");
    localStorage.removeItem("tweight");
    localStorage.removeItem("comment");

    // Store all content into localStorage
    localStorage.setItem("cweight", cweight);
    localStorage.setItem("tweight", tweight);
    localStorage.setItem("comment", comment);
});

var sumCals = localStorage.getItem("sumCals");

if (sumCals == null) {
    sumCals = 0;
} else {
    sumCals = parseInt(sumCals);
}


// Capture Button Click for Nutrition Hub
$("#save-changes-nutri").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var calEaten = parseInt($("#cal-mod").val().trim());
    var calLimit = parseInt($("#cal-limit").val().trim());

    sumCals += calEaten;

    console.log(sumCals);

    // Replaces the content in the div with the new info
    $("#cal-eaten-display").text(sumCals);
    $("#cal-limit-display").text(calLimit);

    //Clear localStorage
    // //localStorage.clear();
    // localStorage.removeItem("calEaten");

    // Store all content into localStorage
    localStorage.setItem("sumCals", sumCals);
    localStorage.setItem("limitCals", calLimit);

    //TODO I NEED HELP PARSE ADDING THESE ADDITIONAL VALUES!
});

// Capture Button Click for Fitness Hub
$("#save-changes-fit").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var bodyWork = $("#bodyWork").val().trim();
    var cardio = $("#cardio").val().trim();

    // Console log each of the user inputs to confirm we are receiving them
    console.log(bodyWork);
    console.log(cardio);

    // Replaces the content in the div with the new info
    $("#body-work-display").text(bodyWork);
    $("#cardio-display").text(cardio);

    // Clear localStorage
    //localStorage.clear();
    localStorage.removeItem("bodyWork");
    localStorage.removeItem("cardio");

    // Store all content into localStorage
    localStorage.setItem("bodyWork", bodyWork);
    localStorage.setItem("cardio", cardio);

});

// By default display the content from localStorage
$("#cweight-display").text(localStorage.getItem("cweight"));
$("#tweight-display").text(localStorage.getItem("tweight"));
$("#comment-display").text(localStorage.getItem("comment"));
$("#cal-eaten-display").text(localStorage.getItem("sumCals"));
$("#cal-limit-display").text(localStorage.getItem("limitCals"));
$("#body-work-display").text(localStorage.getItem("bodyWork"));
$("#cardio-display").text(localStorage.getItem("cardio"));