/*
 * findmealab.js
 * 
 * Christopher Tin-Loi
 * 
 */

$(function() {

	getLocation();

});



function getLocation() {
	var location_div = document.getElementById("location");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geo_success,geo_error);
  } else {
    location_div.innerHTML = "Geolocation is not supported by this browser.";
  }

  function geo_success(position) {
	console.log("got here");
	  location_div.innerHTML = "Latitude: " + position.coords.latitude + 
	  "<br>Longitude: " + position.coords.longitude;
	}

	function geo_error() {
	  location_div.innerHTML = "Sorry, no position available.";
	}
}

