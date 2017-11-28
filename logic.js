




// when the submit button is pressed, run the api and determine find the cheapest flights 
// ajax set up 




$("#add-user").on("click", function(){
	event.preventDefault();
	var origin = $("#start-input").val().trim();
	var uTemp = $("#temp-input").val().trim();
	// var wTemp = [];
	var uStartDate = $("#departure-input").val().trim();
	var uEndDate = $("#return-input").val().trim();


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

	

});

	


