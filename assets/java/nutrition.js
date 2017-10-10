// Initialize Firebase
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



$("#searchButton").on("click", function(event) {
    $("#foodInformation").html("");
    $("#foodImg").html("");
    event.preventDefault();

    var item = $("#foodInput").val().trim();
    console.log(item);

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

            $("#foodInformation").append("<div>Calories: " + caloriesUser +" " + "cals" + "</div><div> Serving Quantity: " + qtyQuantUser + " " + svgUnitUser + "</div><div> Serving Weight: " + svgWeightUser + "g" + "</div><div>" + "<br>" + "</div><div>Cholesterol: " + cholesterolUser + "mg" + "</div><div>Fiber: " + fiberUser + "g" + "</div><div>Carbohydrate: " + carbUser + "g" + "</div><div> Sugar: " + sugarUser + "g" + "</div><div> Sodium: " + sodiumUser + "g" + "</div><div> Protein: " + proteinUser + "g" + "</div><div> Total Fat: " + tolFatUser + "g" + "</div><div> Saturated Fat: " + satFatUser + "g" + "</div>");
            $("#foodImg").append(foodPic);

                console.log(response);

   })

});

//On click events to add food items to the coresponding wells
$("#breakfastWell").on("click", function(event) {
    var value = $("#foodInput").val();
    console.log("value", value);
    $("#breakfastMeal").append("<div>"+ value + " " + caloriesUser + "cals" + "</div>");

});
$("#snackOneWell").on("click", function(event) {
    var value = $("#foodInput").val();
    console.log("value", value);
    $("#snackOneMeal").append("<div>"+ value + " " + caloriesUser + "cals"  + "</div>");

});
$("#lunchWell").on("click", function(event) {
    var value = $("#foodInput").val();
    console.log("value", value);
    $("#lunchMeal").append("<div>"+ value + " " + caloriesUser + "cals"  + "</div>");

});
$("#snackTwoWell").on("click", function(event) {
    var value = $("#foodInput").val();
    console.log("value", value);
    $("#snackTwoMeal").append("<div>"+ value + " " + caloriesUser + "cals"  + "</div>");

});
$("#dinnerWell").on("click", function(event) {
    var value = $("#foodInput").val();
    console.log("value", value);
    $("#dinnerMeal").append("<div>"+ value + " " + caloriesUser + "cals"  + "</div>");

});

