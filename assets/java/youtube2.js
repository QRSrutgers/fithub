var CLIENT_ID = '432317403557-0tm9npcn21fnb397riijjinkq1cnmpse.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
var videoId = [];

googleApiClientReady = function() {
    gapi.auth.init(function() {
        window.setTimeout(checkAuth, 1);
        console.log("client");
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        $("#signin-button").on("click", function() {
            handleAuthClick();
        });
        $("#signout-button").on("click", function() {
            handleSignoutClick();
        })
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        $('#search-button').attr('disabled', false);
        $("#signin-button").hide();
        $("#signout-button").show();

    } else {
        $("#signin-button").show();
        $("#signout-button").hide();
        $('#search-button').attr('disabled', true);
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    $("#videosGoHere").html("");
    $("#pic").html("");
    $("#notes").hide();
    $("#userNotes").hide();
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
var pic = [];
var title;

function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });
    request.execute(function(response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
            title.push(response.items[i].snippet.title);

            pic.push(response.items[i].snippet.thumbnails.high.url);

            videoId.push(response.items[i].id.videoId);
            $("#pic").append("<p>" + title[i] + "</p><img class='selection' data-answer-index='" + i + "' src='" + pic[i] + "'><br>");
        }
    });
};

$("#staffPickBtn").on("click", function() {
    $("#videoHome").html("<div class='col-lg-4 text-center'><h3>Kelly's pick</h3><img class='staffVideo' data-index='1'src='https://i.ytimg.com/vi/S0ZAPSKhWRM/hqdefault.jpg'></div><div class='col-lg-4 text-center'><h3>Ray's pick</h3><img class='staffVideo' data-index='2'src= 'https://i.ytimg.com/vi/ZtlH0A5dlLg/hqdefault.jpg'></div><div class='col-lg-4 text-center'><h3>Stephen's pick</h3><img class='staffVideo' data-index='3'src='https://i.ytimg.com/vi/S0ZAPSKhWRM/hqdefault.jpg'></div>");

    $("#videoHome").show();
    $("#videoSearched").hide();

});


$("#newNotesBtn").on("click", function() {
    $("#videoHome").show();
    $("#videoSearched").hide();

    $("#videoHome").html("<div class='col-lg-6'><textarea id='newNotes'>Here is where you can add new notes</textarea></div><div class='col-lg-1 text-center'><button id='addNote'>Add Notes</button></div><div class='col-lg-5 text-right' id='notesDisplay'>Notes from local storage will display here</div>");
});


$("#videoHome").on("click", ".staffVideo", function() {
    var staffChosen = ($(this).data("index"));
    console.log(staffChosen);
    if (staffChosen == 1) {
        $("#videoHome").html("<div class='col-lg-6 text-center'><h2>Chest Workout</h2><iframe class='videoFrame' src='https://www.youtube.com/embed/ZtlH0A5dlLg'></iframe></div><div id='center1' class='col-lg-6 text-right'><h2>Exersice instructions</h2><textarea>#1Barbell Bench Press: 3 sets of 20,15,10 reps. #2 Incline Dumbbell Press: 2 sets of 10-12 reps to failure. #3 Flat Dumbbell Fly: 2 sets of 15 reps to failure. #4 Bar Dip: 3 sets to failure. #5 Push-Up: 100 reps. Link: https://www.bodybuilding.com/content/5-best-exercises-for-a-bigger-chest.html</textarea>");
    }
    if (staffChosen == 2) {
        $("#videoHome").html("<div id='center1' class='col-lg-6'><h2>Chest Workout</h2><iframe class='videoFrame' src='https://www.youtube.com/embed/ZtlH0A5dlLg'></iframe></div><div id='center1' class='col-lg-6'><h2>Exersice instructions</h2><textarea id='staffNotes'>#1Barbell Bench Press: 3 sets of 20,15,10 reps. #2Incline Dumbbell Press: 2 sets of 10-12 reps to failure. #3Flat Dumbbell Fly: 2 sets of 15 reps to failure. #4Bar Dip: 3 sets to failure. #5Push-Up: 100 reps.<a href='https://www.bodybuilding.com/content/5-best-exercises-for-a-bigger-chest.html'>More information</a></textarea>");
    }
    if (staffChosen == 3) {
        $("#videoHome").html("<div class='col-lg-6 text-right'><h2>Chest Workout</h2><iframe class='videoFrame' src='https://www.youtube.com/embed/S0ZAPSKhWRM'></iframe></div><div id='center1' class='col-lg-6 text-center'><h2>Exersice instructions</h2><textarea id='staffNotes'>#1Barbell Bench Press: 3 sets of 20,15,10 reps. #2Incline Dumbbell Press: 2 sets of 10-12 reps to failure. #3Flat Dumbbell Fly: 2 sets of 15 reps to failure. #4Bar Dip: 3 sets to failure. #5Push-Up: 100 reps.<a href='https://www.bodybuilding.com/content/5-best-exercises-for-a-bigger-chest.html'>More information</a></textarea>");
    }
});

$("#newNotesBtn").on("click", function() {

})

$("#userNotes").hide();
$("#notes").hide();
$("#userNotes").hide();


$("body").on("click", ".selection", function() {

    var chosen = ($(this).data("answer-index"));

    $("#videosGoHere").html("<iframe id='player'src='https://www.youtube.com/embed/" + videoId[chosen] + "'></iframe>");

    $("#userNotes").show();
    $("#notes").show();
});

$("#search-button").on("click", function() {
    $("#videoSearched").show();
    $("#videoHome").hide();
    title = [];
    pic = [];
    videoId = [];
    $("#pic").html("");
    $("#videosGoHere").html("");
    search();
    $("#userNotes").hide();
    $("#notes").hide();
});