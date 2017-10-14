// Initialize Firebase
$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyCuL61Gvgdklq_-3v3cLoizlqkEtjAo4kg",
        authDomain: "fithub-d10cb.firebaseapp.com",
        databaseURL: "https://fithub-d10cb.firebaseio.com",
        projectId: "fithub-d10cb",
        storageBucket: "",
        messagingSenderId: "1015882541966"
    };

    firebase.initializeApp(config);

    //Capture value from search button
    var caloriesUser;
    var cholesterolUser;
    var fiberUser;
    var carbUser;
    var qtyQuantUser;
    var svgUnitUser;
    var svgWeightUser;
    var sugarUser;
    var sodiumUser;
    var proteinUser;
    var tolFatUser;
    var satFatUser;
    var foodPic;

    //These arrays will be populated from local storage.
    var arryBkfst = [];
    var arrySnck1 = [];
    var arryLunch = [];
    var arrySnck2 = [];
    var arryDinner = [];

    //These 5 variables are only used to determine if local storage values are null because if they are the array logic won't work.
    var initBkfst = localStorage.getItem("bkfstStored");
    var initSnck1 = localStorage.getItem("snck1Stored");
    var initLunch = localStorage.getItem("lunchStored");
    var initSnck2 = localStorage.getItem("snck2Stored");
    var initDinner = localStorage.getItem("dinnerStored");

    // Parse into array from local storage as long as inital value is not null.  Then loop through the array to append to HTML upon page load.  This is done for each of the five meal wells.
    if (initBkfst !== null) {
        arryBkfst = JSON.parse(localStorage.getItem("bkfstStored"));
    }
    for (var i = 0; i < arryBkfst.length; i += 2) {
        $("#breakfastMeal").append("<div>" + arryBkfst[i] + " " + arryBkfst[i + 1] + "cals" + "</div>");
    };

    if (initSnck1 !== null) {
        arrySnck1 = JSON.parse(localStorage.getItem("snck1Stored"));
    }
    for (var i = 0; i < arrySnck1.length; i += 2) {
        $("#snackOneMeal").append("<div>" + arrySnck1[i] + " " + arrySnck1[i + 1] + "cals" + "</div>");
    };

    if (initLunch !== null) {
        arryLunch = JSON.parse(localStorage.getItem("lunchStored"));
    }
    for (var i = 0; i < arryLunch.length; i += 2) {
        $("#lunchMeal").append("<div>" + arryLunch[i] + " " + arryLunch[i + 1] + "cals" + "</div>");
    };

    if (initSnck2 !== null) {
        arrySnck2 = JSON.parse(localStorage.getItem("snck2Stored"));
    }
    for (var i = 0; i < arrySnck2.length; i += 2) {
        $("#snackTwoMeal").append("<div>" + arrySnck2[i] + " " + arrySnck2[i + 1] + "cals" + "</div>");
    };

    if (initDinner !== null) {
        arryDinner = JSON.parse(localStorage.getItem("dinnerStored"));
    }
    for (var i = 0; i < arryDinner.length; i += 2) {
        $("#dinnerMeal").append("<div>" + arryDinner[i] + " " + arryDinner[i + 1] + "cals" + "</div>");
    };

    // User enters data

    $("#searchButton").on("click", function(event) {
        $("#foodInformation").html("");
        $("#foodImg").html("");
        event.preventDefault();

        var item = $("#foodInput").val().trim();

        data = {
            "query": $("#foodInput").val(),
            "timezone": "US/Eastern"
        }

        $.ajax({
                url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
                method: "POST",
                headers: {
                    "x-app-key": "1eb96e010cbd0f1bc70487f4eb3f0cfb",
                    "x-app-id": "537e4865"
                },
                data: data
            })
            .done(function(response) {


                caloriesUser = Math.round(response.foods[0].nf_calories);
                cholesterolUser = Math.round(response.foods[0].nf_cholesterol);
                fiberUser = Math.round(response.foods[0].nf_dietary_fiber);
                carbUser = Math.round(response.foods[0].serving_qty);
                qtyQuantUser = Math.round(response.foods[0].serving_qty);
                svgUnitUser = response.foods[0].serving_unit;
                svgWeightUser = Math.round(response.foods[0].serving_weight_grams);
                sugarUser = Math.round(response.foods[0].nf_sugars);
                sodiumUser = Math.round(response.foods[0].nf_sodium);
                proteinUser = Math.round(response.foods[0].nf_protein);
                tolFatUser = Math.round(response.foods[0].nf_total_fat);
                satFatUser = Math.round(response.foods[0].nf_saturated_fat);
                foodPic = $("<img>");
                foodPic.attr("src", response.foods[0].photo.thumb);

                $("#foodInformation").append("<div>Calories: " + caloriesUser + " " + "cals" + "</div><div> Serving Quantity: " + qtyQuantUser + " " + svgUnitUser + "</div><div> Serving Weight: " + svgWeightUser + "g" + "</div><div>" + "<br>" + "</div><div>Cholesterol: " + cholesterolUser + "mg" + "</div><div>Fiber: " + fiberUser + "g" + "</div><div>Carbohydrate: " + carbUser + "g" + "</div><div> Sugar: " + sugarUser + "g" + "</div><div> Sodium: " + sodiumUser + "g" + "</div><div> Protein: " + proteinUser + "g" + "</div><div> Total Fat: " + tolFatUser + "g" + "</div><div> Saturated Fat: " + satFatUser + "g" + "</div>");
                $("#foodImg").append(foodPic);

            })

    });

    //On click events to add food items to the coresponding wells.  Then the same items are pushed into an array that is stringified in order to be saved in local storage.  Arrays themselves cannot be saved there, only JSON strings.

    $("#breakfastWell").on("click", function(event) {
        var value = $("#foodInput").val();
        $("#breakfastMeal").append("<div>" + value + " " + caloriesUser + " Cals" + "</div>");

        arryBkfst.push(value, caloriesUser);
        storedBkfst = JSON.stringify(arryBkfst);

        localStorage.setItem("bkfstStored", storedBkfst);

    });

    $("#snackOneWell").on("click", function(event) {
        var value = $("#foodInput").val();
        $("#snackOneMeal").append("<div>" + value + " " + caloriesUser + " Cals" + "</div>");

        arrySnck1.push(value, caloriesUser);
        storedSnck1 = JSON.stringify(arrySnck1);

        localStorage.setItem("snck1Stored", storedSnck1);
    });

    $("#lunchWell").on("click", function(event) {
        var value = $("#foodInput").val();
        $("#lunchMeal").append("<div>" + value + " " + caloriesUser + " Cals" + "</div>");

        arryLunch.push(value, caloriesUser);
        storedLunch = JSON.stringify(arryLunch);

        localStorage.setItem("lunchStored", storedLunch);
    });

    $("#snackTwoWell").on("click", function(event) {
        var value = $("#foodInput").val();
        $("#snackTwoMeal").append("<div>" + value + " " + caloriesUser + " Cals" + "</div>");

        arrySnck2.push(value, caloriesUser);
        storedSnck2 = JSON.stringify(arrySnck2);

        localStorage.setItem("snck2Stored", storedSnck2);
    });

    $("#dinnerWell").on("click", function(event) {
        var value = $("#foodInput").val();
        $("#dinnerMeal").append("<div>" + value + " " + caloriesUser + " Cals" + "</div>");

        arryDinner.push(value, caloriesUser);
        storedDinner = JSON.stringify(arryDinner);

        localStorage.setItem("dinnerStored", storedDinner);

    });
})