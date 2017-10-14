$(document).ready(function() {

  //On click event for page navs
  $("#nutriArrow").on("click", function() {
    window.location.href = "nutrition.html";
  });
  //On click event for page navs
  $("#excerciseArrow").on("click", function() {
    window.location.href = "exercise.html";
  });
  //On click event for page navs
  $("#socialArrow").on("click", function() {
    window.location.href = "social.html";
  });

  function timer() {
    timerForClock = setInterval(function() {
      var currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");

      $("#actualTimeDisplay").html(currentTime);
    }, 1000);

  };

  timer();

  var progress = localStorage.getItem("WaterBar");

  if (progress == null) {
    progress = 0;
  } else {
    progress = parseInt(progress);
  }

  $("#resetProgress").on("click", function() {
    progress = 0;

    $("#progressBar").html("<div class='progress-bar progress-bar-striped' role='progressbar' style='width:" + progress + "px;'" + "aria-valuenow='10' aria-valuemin='0' aria-valuemax='100'></div>");

    localStorage.getItem("WaterBar", 0);
  })

  $("#progressBar").html("<div class='progress-bar progress-bar-striped' role='progressbar' style='width:" + progress + "px;'" + "aria-valuenow='10' aria-valuemin='0' aria-valuemax='100'></div>");

  $("#droplet").on("click", function(e) {
    e.preventDefault();

    progress += 100;

    $("#progressBar").html("<div class='progress-bar progress-bar-striped' role='progressbar' style='width:" + progress + "px;'" + "aria-valuenow='10' aria-valuemin='0' aria-valuemax='100'></div>");

    localStorage.setItem("WaterBar", progress);
  })

  // Button clicks for ALL the modals
  // Capture Button Click for Prof Hub
  $("#save-changes-profHub").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var name = $("#name-entry").val().trim();
    var email = $("#email-entry").val().trim();
    var birthday = $("#age-entry").val().trim();

    // Replaces the content in the div with the new info
    $("#name-display").html(name);

    // Clear localStorage
    //localStorage.clear();
    localStorage.removeItem("name");

    // Store all content into localStorage
    localStorage.setItem("name", name);
  });

  // Capture Button Click for Your Hub
  $("#save-changes-yourHub").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var cweight = $("#cweight").val().trim();
    var tweight = $("#tweight").val().trim();
    var comment = $("#comment-input").val().trim();

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

  $("#calorieLimit").on("click", function(e) {
    e.preventDefault();

    calLimit = parseInt($("#cal-limit").val().trim());

    calLimitDisplay = parseInt($("#cal-limit").val().trim());

    $("#cal-limit-display").text(calLimitDisplay);
    $("#cal-eaten-display").text(0);
    $("#cal-left-display").text(0);

    sumCals = 0;

    calsLeft = 0;

    calEaten = 0;

    localStorage.setItem("calLimitDisplay", calLimitDisplay);

  });

  var calLimit = localStorage.getItem("calLimit");

  var calsLeft = localStorage.getItem("calsLeft");

  // Capture Button Click for Nutrition Hub
  $("#save-changes-nutri").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables

    var calEaten = $("#cal-mod").val().trim();

    if (calEaten !== "") {
      calEaten = parseInt(calEaten);
    } else {
      calEaten = 0;
    }

    sumCals += calEaten;

    calsLeft = calLimit -= calEaten;

    // Replaces the content in the div with the new info
    $("#cal-eaten-display").text(sumCals);
    $("#cal-left-display").text(calsLeft);


    //Clear localStorage
    // //localStorage.clear();
    // localStorage.removeItem("calEaten");

    // Store all content into localStorage
    localStorage.setItem("calLimit", calLimit);
    localStorage.setItem("sumCals", sumCals);
    localStorage.setItem("calsLeft", calsLeft);

  });

  // Capture Button Click for Fitness Hub
  $("#save-changes-fit").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var bodyWork = $("#bodyWork").val().trim();
    var cardio = $("#cardio").val().trim();
    var notes = $("#notesFit").val().trim();

    // Replaces the content in the div with the new info
    $("#body-work-display").text(bodyWork);
    $("#cardio-display").text(cardio);
    $("#notes-display").text(notes);


    // Clear localStorage
    //localStorage.clear();
    localStorage.removeItem("bodyWork");
    localStorage.removeItem("cardio");
    localStorage.removeItem("notes");


    // Store all content into localStorage
    localStorage.setItem("bodyWork", bodyWork);
    localStorage.setItem("cardio", cardio);
    localStorage.setItem("notes", notes);

  });

  // Capture Button Click for Prof Hub
  $("#save-changes-social").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var nameEvent = $("#eventName").val().trim();
    var timeEvent = $("#eventTime").val().trim();

    // Replaces the content in the div with the new info
    $("#event-name-display").html(nameEvent);
    $("#event-time-display").html(timeEvent);

    // Clear localStorage
    //localStorage.clear();
    localStorage.removeItem("nameEvent");
    localStorage.removeItem("timeEvent");


    // Store all content into localStorage
    localStorage.setItem("nameEvent", nameEvent);
    localStorage.setItem("timeEvent", timeEvent);

  });

  // By default display the content from localStorage
  $("#name-display").text(localStorage.getItem("name"));
  $("#cweight-display").text(localStorage.getItem("cweight"));
  $("#tweight-display").text(localStorage.getItem("tweight"));
  $("#comment-display").text(localStorage.getItem("comment"));
  $("#cal-eaten-display").text(localStorage.getItem("sumCals"));
  $("#cal-limit-display").text(localStorage.getItem("calLimitDisplay"));
  $("#cal-left-display").text(localStorage.getItem("calsLeft"));
  $("#body-work-display").text(localStorage.getItem("bodyWork"));
  $("#cardio-display").text(localStorage.getItem("cardio"));
  $("#notes-display").text(localStorage.getItem("notes")); //fix this
  $("#event-name-display").text(localStorage.getItem("nameEvent"));
  $("#event-time-display").text(localStorage.getItem("timeEvent"));

})





