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
	var freelabs_div = document.getElementById("freelabs");

	$.ajax({
		type: 'GET',
    url: "http://cgi.cse.unsw.edu.au/~ctin273/labs.php",
    dataType: 'jsonp',
    success: function (data) {
      var freeLabRegex = /Lab.*FREE/gi,
			  matches,
			  matchArr = [];

			while (matches = freeLabRegex.exec(data)) {
			  matchArr.push(decodeURIComponent(matches[0]));   
			}

			console.log(matchArr);
			var freeLabArr = [];
			for(var i = 0; i < matchArr.length; i++){
				freeLabArr.push(matchArr[i].split(" ")[1]);
	    }
	    console.log(freeLabArr);

	    freelabs_div.innerHTML = freeLabArr;

		}
  });
}

