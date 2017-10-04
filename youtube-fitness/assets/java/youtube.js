var CLIENT_ID = '432317403557-0tm9npcn21fnb397riijjinkq1cnmpse.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
var videoId = [];
var link;

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
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function createsLocation() {
    for (var i = 0; i < 5; i++) {
        $("#videosGoHere").append("<div id='player" + i + "'>here</div><br>");
    }
}

function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });
    request.execute(function(response) {
        for (var i = 0; i < 5; i++) {
            videoId.push(response.items[i].id.videoId);
        }
        for (var i = 0; i < 5; i++) {
            $("#videosGoHere").append("<iframe id='player" + i + "' src='https://www.youtube.com/embed/" + videoId[i] + "'></iframe><br>");
        }
    });
}

$("#search-button").on("click", function() {
    videoId = [];
    $("#videosGoHere").html("");
    search();
});