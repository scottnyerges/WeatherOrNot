




// when the submit button is pressed, run the api and determine find the cheapest flights 
// ajax set up 

var origin;
var uTemp;
var uStartDate;
var uEndDate;
var queryURL;




function getTemp(){
	event.preventDefault();
	 origin = $("#start-input").val().trim();
	 uTemp = $("#temp-input").val().trim();
	//  wTemp = [];
	 uStartDate = $("#departure-input").val().trim();
	 uEndDate = $("#return-input").val().trim();
	 queryURL = "http://api.wunderground.com/api/25befb141962c397/geolookup/conditions/q/iata:" + origin + ".json"



	$.ajax({
		url: queryURL,
		method: "GET"

	})

	.done(function(response){
		console.log(response);
		console.log(response.current_observation.temp_f);

	})

	console.log(origin);
	console.log(uTemp);
	console.log(uStartDate);
	console.log(uEndDate);




	$("#start-input").val("");
	$("#temp-input").val("");
	$("#departure-input").val("");
	$("#return-input").val("");



// };



// var origin = $("#start-input").val().trim();
// function getFlights(){
var fToken =  "T1RLAQIYytIowY4qyuBND8os77W/cpomkhAIR2dXVaeJSJkpHZ+APCCyAADA5i0Y8IhcWejGWKEC5H2JpZdeqOJ3P/H9XQ6vhehTM8zXKFQezPoTlcmMHKKCYWezJ3IwOpgi9yv42W89MzB9DgCLV0q4hTMpkAtj+HBQyzzZXee7NnvgwTzNXUVAEfgvOvZUu0q5dnYEPNNszxw4aJLE2tT+8UfVusEbrbZxTRIzSOIPPMP3znpy4Z4TLeVP0BmxbfcsMu5NnzuaLo6ZpQb1x6atKm41Zu+K6clGM0aPoFFdji11qZWdOB9GxAo7";

var querySabre="https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?origin="
+origin+
"&departuredate=2017-12-15&returndate=2017-12-25&maxfare=220";

$.ajax({

	method: "GET",
	beforeSend: function(request) {
    request.setRequestHeader("Authorization", "Bearer "+fToken);
    request.setRequestHeader("Content-Type", "application/json")
  },

	url: querySabre,
})

.done(function(response){

console.log("flights");
var fResults=response.FareInfo;
var destinationResults = fResults[0].DestinationLocation

console.log(fResults);	
console.log(destinationResults);
console.log("1 " + fResults[0].DestinationLocation);
console.log("2 " + fResults[1].DestinationLocation);
console.log("3 " + fResults[2].DestinationLocation);
console.log("4 " + fResults[4].DestinationLocation);
});






	
	queryURL = "http://api.wunderground.com/api/25befb141962c397/geolookup/conditions/q/iata:" + destinationResults + ".json"

	$.ajax({
		url: queryURL,
		method: "GET"

	})

	.done(function(response){
		console.log(response);
		console.log("destination " + response.location.city);
		console.log("destination temp " + response.current_observation.temp_f);

	})




};

$("#add-user").on("click", function(){
	getTemp();
	// getFlights();
	// searchResults();
	
});





