/*
 * findmealab.js
 * 
 * Christopher Tin-Loi
 * 
 */

$(function() {

	get_location();

	get_open_labs();
});



function get_location() {
	var location_div = document.getElementById("location");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geo_success,geo_error);
  } else {
    location_div.innerHTML = "Geolocation is not supported by this browser.";
  }

  function geo_success(position) {
	  location_div.innerHTML = "You are at:<br> <i>Latitude: " + position.coords.latitude + 
	  "<br>Longitude: " + position.coords.longitude + "</i>";
	}

	function geo_error() {
	  location_div.innerHTML = "Sorry, no position available.";
	}

}

function get_open_labs() {
	$.get("getlabs.php", function( data ) {
	  
	  var qualityRegex = /Lab.*FREE/g,
		    matches,
		    qualities = [];

		while (matches = qualityRegex.exec(data)) {
		    qualities.push(decodeURIComponent(matches[1]));   
		}
		console.log(data);
	});

}

