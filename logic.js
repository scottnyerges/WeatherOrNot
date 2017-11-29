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

// when btn pressed, take values from inputs and set global
// variable values to them
$("#add-user").on("click", function() {
    event.preventDefault();
    origin = $("#start-input").val().trim();
    uTemp = $("#temp-input").val().trim();
    // var wTemp = [];
    uStartDate = $("#departure-input").val().trim();
    uEndDate = $("#return-input").val().trim();

    // console log the user variables
    console.log(origin);
    console.log(uTemp);
    console.log(uStartDate);
    console.log(uEndDate);

    // set i=0 so it starts over if you enter another query
    i = 0;

    // run the get flights function
    getFlights();

    // clears out the input fields after button click
    $("#start-input").val("");
    $("#temp-input").val("");
    $("#departure-input").val("");
    $("#return-input").val("");



});

// this is the token for the SABRE API - it may expire, then ill update this one
// maybe later we add functionality to get a token on page load 
// or check if the token is valid and if not, get a new token
// and update the token var
var fToken = "T1RLAQLuUHKwziVrJzyrWyxSGPbkiXPThRCi0r29HTuRf7JArSIvWJPMAADAY9bIMT47oSV/sUjpVvfcJ6Tl5ElS2XK6N8zNU3qIHguH0X/TRCMZM3OHaYGMyHqws/fxTqS8Ne2k7IyhtIyUXYFO5Y43i8mdw4KwjoZQxF8c/HbOAPwz2RzyjhJV8osxpR0dd7Y1c7r1Mv0VQ0IBGOsaYq602SDu7s0Mq9rHSwn5YvVawqqEBk7JCrLwRyPATF6g33hURbpDgE05Grhp5dGrsyLSWEKhBM5zglu51ST3SGseNEV8m1LSUOhPxj6u";


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
            // 	console.log(fResults[0].LowestFare.AirlineCodes);

            //at the end of the flights func, we kick off getTemps func
            getTemps();
        });

};

function getTemps() {
    console.log("running getTemps");

    var wQueryURL = "http://api.wunderground.com/api/25befb141962c397/geolookup/conditions/q/iata:" +
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
                $("#results").append(`
        <tr>
        	<td scope=row>${wDestination}</td>
        	<td>${wTemp} F</td>
            <td>${uStartDate}</td>
            <td>${uEndDate}</td>
            <td>$${fPrice}</td>
            <td><a href="https://www.kayak.com/flights/${origin}-${fDestination}/${uStartDate}/${uEndDate}?sort=price_a" target="_blank">Link</a></td>            
        </tr>
        `);

            };
            if (i < fCount) {
                getFlights()
            }

        })

}
