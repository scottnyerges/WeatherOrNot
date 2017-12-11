// firebase access
var config = {
    apiKey: "AIzaSyDs0DhM5MNy7Ztge5tqW17NH6ipbgsyCHI",
    authDomain: "weatherornot-95c09.firebaseapp.com",
    databaseURL: "https://weatherornot-95c09.firebaseio.com",
    projectId: "weatherornot-95c09",
    storageBucket: "weatherornot-95c09.appspot.com",
    messagingSenderId: "477066938219"
};
firebase.initializeApp(config);

var database = firebase.database();


// declare some global variables so we can change em with functions
var origin = "DFW";
var uTemp = 60;
var uStartDate = "2017-12-15";
var uEndDate = "2017-12-20";
var fDestination;
var fPrice;
var wTemp;
var wDestination;
var i = 0;
var fCount;
var currentTime = moment().format('YYYY-MM-DD');
var trendPlace;
var maxTime = moment(uEndDate).add(16, 'days').format('YYYY-MM-DD');
var trendingCount = 0;
var currentSel = "Dallas/Ft Worth, Texas";



// when btn pressed, take values from inputs and set global
// variable values to them
$("#add-user").on("click", function() {
    event.preventDefault();
    origin = $("#start-input").attr("code");
    uTemp = $("#temp-input").val().trim();
    uStartDate = $("#departure-input").val().trim();
    uEndDate = $("#return-input").val().trim();

    // console log the user variables
    console.log(origin);
    console.log(uTemp);
    console.log(uStartDate);
    console.log(uEndDate);
    console.log(currentTime);
    console.log(maxTime);
    $("#dates").html("");
    $("#results").html("");

    $("#dates").append(`
            <td scope=row>${uStartDate}</td>
            <td>${uEndDate}</td>
                    `);


    if (uStartDate < currentTime) {
        console.log("invalid_response");
        $("#invalidStart").html("<h5>Invalid Date, You are not a time traveler!</h5>");

    }
    if (uEndDate > maxTime) {
        console.log("too far out");
        $("#invalidEnd").html("<h5>Too Far Out!</h5>");

    } else if ((currentTime == uStartDate) || (uStartDate >= currentTime)) {



        $("#invalidStart").html("");
        $("#invalidEnd").html("");

        // set i=0 so it starts over if you enter another query
        i = 0;

        // run the get flights function
        getFlights();


        // clears out the input fields after button click
        $("#start-input").val("");
        $("#temp-input").val("");
        $("#departure-input").val("");
        $("#return-input").val("");


    }

});

// this is the token for the SABRE API - it expires after a week
// last updated 12/8 at ~10AM
// updateToken func will update it after we learn some more stuff next week
var fToken = "T1RLAQIljucrG1j3XpIwO6BV6988PJPAthDaqu7kXDgL29xrugLx8ECUAADAutvU7eumJ7MjUeS94vFIObqCVD0q569VXQHkq/PzvtxAFjFEDjbKiMASefOG+NBdC9aX7Za0HaAg2TVR2WoLwuvxPGXHVhFyTEwuRniuim6uwU5js0bFPXDyyVoI9dqvarVcOXvPufb7SP+/LguW08TONDzNre8DWgDVOsBW+Kjn1D+YqBW+ly8NVICoDUDYCH7/CfqcE9jOfWxJFWMXaGnf+8FUdTqb5BD4jsULk/nic8M6+DIgmN2X3rhWmAHS";


//the function to call the sabre api
function getFlights() {
    var fQueryURL = "https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?origin=" +
        origin +
        "&departuredate=" + uStartDate + "&returndate=" + uEndDate + "&maxfare=8220&topdestinations=50";

    //if we want to add at max price param input later we can

    $.ajax({
            method: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer " + fToken);
                request.setRequestHeader("Content-Type", "application/json")
            },
            url: fQueryURL
        })
        .done(function(fResponse) {
            console.log("running getFlights");

            //  if we get invalid creds error,then run the updateToken function, 
            // which updates ccreds then runs getFlights again
            if (fResponse.message == "Authentication failed due to invalid credentials") {
                alert("Authorization error. Getting you a new token!");
                updateToken();
            } else {

                var fResults = fResponse.FareInfo;
                //determine how many flights we got back
                fCount = fResults.length;
                console.log(fResults);
                console.log(fCount);

                console.log(fResults[i].DestinationLocation);
                //set the global flight destination var to the dest of whatever 
                //flight result we're on
                fDestination = fResults[i].DestinationLocation;

                console.log(fResults[i].LowestFare.Fare);
                //set the global flight price var to the dest of whatever 
                //flight result we're on
                fPrice = fResults[i].LowestFare.Fare;
                //  console.log(fResults[0].LowestFare.AirlineCodes);

                //at the end of the flights func, we kick off getTemps func
                getTemps();
            }
        });

};

function getTemps() {
    console.log("running getTemps");

    var wQueryURL = "https://api.wunderground.com/api/5849bb5f32d4cc5d/geolookup/conditions/q/iata:" +
        fDestination + ".json";
    $.ajax({
            method: "GET",
            url: wQueryURL
        })
        .done(function(wResponse) {
            //set the global weather temp var to the temp of the current flight result
            wTemp = wResponse.current_observation.temp_f;
            //set the global weather dest var to the weather city of the current flight result
            //because the weather api give us actual city names, not just airport codes
            wDestination = wResponse.current_observation.observation_location.full;
            console.log("curr fDest: " + fDestination);
            console.log("curr wDest: " + wDestination);
            console.log("curr temp: " + wTemp);

            // if desired temp and wTemp match, append current data set to results table html
            // and i++, then run get flights again unless we've hit the end of the flight list
            i++;
            console.log(i);

            if (wTemp - 7 < uTemp && uTemp < wTemp + 7) {


                var newRow = $(`

        <tr>
            <td scope=row class="trending">${wDestination}</td>
            
            <td class="trending_temp">${wTemp} F</td>
            <td>$${fPrice}</td>
            // <td> <a href="https://www.kayak.com/flights/${origin}-${fDestination}/${uStartDate}/${uEndDate}?sort=price_a" target="_blank"></a></td>            
      </tr>
        `);

                $("#results").append(newRow);
                newRow.click(function() {
                    var a = $(this).find("a") //.click();
                    console.log(a.attr("href"));
                    window.open(a.attr('href'), '_blank');


                    var $row = $(this).closest("tr");
                    var place = $row.find(".trending").text();
                    var temp = $row.find(".trending_temp").text();

                    console.log(place);
                    console.log(temp);
                    var trendingP = place;
                    var trendingT = temp;
                    var recentP = place;
                    var recentT = temp;
                    console.log("this is the selected place" + trendingP);


                    database.ref("resultsPlace").push({

                        trendingP: trendingP,
                    });

                    database.ref("resultsTemp").push({

                        trendingT: trendingT,
                    });

                    database.ref("recentPlace").set({

                        recentP: recentP,
                    })

                    database.ref("recentTemp").set({

                        recentT: recentT,
                    })
                })

            };
            if (i < fCount) {
                getFlights()
            }

        })

};

// autocomplete logic
$("#start-input").autocomplete({
    // look at the airportList var, which is in the airport-list.js file cuz it was so long
    source: airportList,
    //don't start autocompleting until after 3 chars entered
    minLength: 3,
    //when you click an option, it fills the input field wth that
    select: function(event, ui) {
        var value = ui.item.value;
        // then take the first 3 letters of that string and give that element a new attr with that code
        $("#start-input").attr("code", value.substr(0, 3));
    }
});

//session expires after 1 week. 
// this function SHOULD call their auth api and get a new token, but the browser won't allow it
// waiting til next week when we cover server stuff
// function updateToken() {
//     var tQueryURL = "https://api-crt.cert.havail.sabre.com/v2/auth/token";

//     $.ajax({
//             method: "POST",
//             beforeSend: function(request) {
//                 request.setRequestHeader("Authorization", "Basic VmpFNk0ydGxiR1oxWkRocmFHa3hNMmgyWXpwRVJWWkRSVTVVUlZJNlJWaFU6VjBOaVVIZ3haamM9");
//                 request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                 request.setRequestHeader("grant_type", "client_credentials")
//             },
//             url: tQueryURL
//         })
//         .done(function(tResponse) {
//             console.log("running updateToken");
//             // update the token var with the new token
//             fToken = tResponse.access_token;
//             getFlights();
//         })
// };


// --------------------------------------------------------------------------------------
// this is the trending function
// whenever a place is selected, that place is matched with an array of recently clicked places



database.ref("recentPlace").on('value', function(snapshot) {
    var tempSel = snapshot.val().recentP;

    database.ref('resultsPlace').on("child_added", function(snapshot) {
        // if the currently selected place matches previously selected places then it adds a point to the trending count

        for (var i = 0; i < snapshot.numChildren(); i++) {
            if (tempSel == snapshot.val().trendingP) {
                trendingCount += 1;
            }

            if (tempSel != snapshot.val().trendingP) {

            }

        };
    });

    console.log("this is the count after loop " + trendingCount);
    // if the trending count is greater than zero than it pushes the trending count and place into firebase

    if ((trendingCount > 0)) {
        currentSel = tempSel;

        database.ref("trendingPl").push({
            place: currentSel,
            count: trendingCount
        });

    } else {

    }
    // resets the trending count 
    trendingCount = 0;

});
// ---------------------------------------------------------------------------------------------
// will take the child with the highest value 
// the value is the number of matches with the current selection and recent searches

database.ref("trendingPl").orderByChild("count").limitToLast(1).on("child_added", function(snapshot) {

    console.log("trending place " + snapshot.val().place + snapshot.val().count);
    var recentSearchP = $("<h2>" + snapshot.val().place + "</h2>");
    $("#trendingPlace").html(recentSearchP);

});


database.ref("recentPlace").on('value', function(snapshot) {

    console.log(snapshot.val().recentP);
    var recentSearchT = $("<h2>" + snapshot.val().recentP + "</h2>");
    $("#recentPlace").html(recentSearchT);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});