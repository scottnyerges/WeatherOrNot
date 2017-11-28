
// UPDATED AS OF 2:45 TUESDAY BY SCOTT

// declare some global variables so we can change em with functions
var origin;
var uTemp;
var uStartDate;
var uEndDate;

// when btn pressed, take values from inputs and set global
// variable values to them
$("#add-user").on("click", function(){
	event.preventDefault();
	 origin = $("#start-input").val().trim();
	 uTemp = $("#temp-input").val().trim();
	// var wTemp = [];
	 uStartDate = $("#departure-input").val().trim();
	 uEndDate = $("#return-input").val().trim();

// console log the user variables






 

// declare some global variables so we can change em with functions
var origin;
var uTemp;
var uStartDate;
var uEndDate;

// when btn pressed, take values from inputs and set global
// variable values to them
$("#add-user").on("click", function(){
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

// run the get flights function
getFlights();


// run the get flights function
getFlights();

// clears out the input fields after button click






// clears out the input fields after button click

	$("#start-input").val("");
	$("#temp-input").val("");
	$("#departure-input").val("");
	$("#return-input").val("");




});

// this is the token for the SABRE API - it may expire, then ill update this one
var fToken =  "T1RLAQIYytIowY4qyuBND8os77W/cpomkhAIR2dXVaeJSJkpHZ+APCCyAADA5i0Y8IhcWejGWKEC5H2JpZdeqOJ3P/H9XQ6vhehTM8zXKFQezPoTlcmMHKKCYWezJ3IwOpgi9yv42W89MzB9DgCLV0q4hTMpkAtj+HBQyzzZXee7NnvgwTzNXUVAEfgvOvZUu0q5dnYEPNNszxw4aJLE2tT+8UfVusEbrbZxTRIzSOIPPMP3znpy4Z4TLeVP0BmxbfcsMu5NnzuaLo6ZpQb1x6atKm41Zu+K6clGM0aPoFFdji11qZWdOB9GxAo7";

function getFlights(){
var queryURL="https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?origin="
+origin+
"&departuredate=2017-12-15&returndate=2017-12-25&maxfare=220";
$.ajax({
	method: "GET",
	beforeSend: function(request) {
    request.setRequestHeader("Authorization", "Bearer "+fToken);
    request.setRequestHeader("Content-Type", "application/json")
  },
	url: queryURL
})
.done(function(response){

var fResults=response.FareInfo;
console.log(fResults);	
console.log(fResults[0].DestinationLocation);
})

}



	// 

	
});


// this is the token for the SABRE API - it may expire, then ill update this one
var fToken =  "T1RLAQIYytIowY4qyuBND8os77W/cpomkhAIR2dXVaeJSJkpHZ+APCCyAADA5i0Y8IhcWejGWKEC5H2JpZdeqOJ3P/H9XQ6vhehTM8zXKFQezPoTlcmMHKKCYWezJ3IwOpgi9yv42W89MzB9DgCLV0q4hTMpkAtj+HBQyzzZXee7NnvgwTzNXUVAEfgvOvZUu0q5dnYEPNNszxw4aJLE2tT+8UfVusEbrbZxTRIzSOIPPMP3znpy4Z4TLeVP0BmxbfcsMu5NnzuaLo6ZpQb1x6atKm41Zu+K6clGM0aPoFFdji11qZWdOB9GxAo7";

function getFlights(){
var queryURL="https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?origin="
+origin+
"&departuredate=2017-12-15&returndate=2017-12-25&maxfare=220";
$.ajax({
	method: "GET",
	beforeSend: function(request) {
    request.setRequestHeader("Authorization", "Bearer "+fToken);
    request.setRequestHeader("Content-Type", "application/json")
  },
	url: queryURL
})
.done(function(response){

var fResults=response.FareInfo;
console.log(fResults);	
console.log(fResults[0].DestinationLocation);
})

}



	// 



