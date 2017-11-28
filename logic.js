




// when the submit button is pressed, run the api and determine find the cheapest flights 
// ajax set up 






$("#add-user").on("click", function(){
	event.preventDefault();
	var origin = $("#start-input").val().trim();
	var uTemp = $("#temp-input").val().trim();
	// var wTemp = [];
	var uStartDate = $("#departure-input").val().trim();
	var uEndDate = $("#return-input").val().trim();
	var queryURL = "http://api.wunderground.com/api/25befb141962c397/geolookup/conditions/q/iata:" + origin + ".json"



	$.ajax({
		url: queryURL,
		method: "GET"

	})

	.done(function(response){
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




// var resultInfo = $("<tr><th>" + trainName + "</th><th>" 
// 	+ destination + "</th><th>" + frequency + "</th><th>"
// 	+ arrival + "</th><th>" + minutesAway + "</th></tr>");

//airport 1 and 2 needs to be the three letter airport code
// var airport1 = ""
// var airport2 = ""
//departure date needs to be in the form of "2017-11-28"
// var departuredate = ""
// var returndate = ""

// function displaysearchbutton() {
// 	var url = "https://www.kayak.com/flights/" + airport1 + "-" + airport2 + "/" + departuredate + "/" + returndate;
// 	window.open(url);


// }


});

	


