/*
 * findmealab.js
 *
 * Christopher Tin-Loi
 *
 */

var secElapsed = 0;
var timer;
var timer2;

$(function() {
	$('#summonerName').focus();
});

$('#summonerForm').on('submit', function(e){
	var spectate_div = document.getElementById("spectate");

	e.preventDefault();
	var name = $('#summonerName').val();
	spectate.innerHTML = 'Detecting summoner status...';
	get_status(name,true,0);
});

function get_status(name,firstCall) {
  var spectate_div = document.getElementById("spectate");

	$.ajax({
		type: 'GET',
		url: "http://cgi.cse.unsw.edu.au/~ctin273/lolspec.php",
		data: "name=" + name,
		dataType: 'jsonp',
		success: function (data) {
			console.log(data);

			var arrData = data.split(",");
			if (arrData[0] === "null") {
				if (name === "") {
					name = "That summoner";
				}
				spectate_div.innerHTML = name + ' does not exist.';
				return;
			} else if(arrData[1] === "null") {
				window.clearInterval(timer);
				window.clearInterval(timer2);
				spectate_div.innerHTML = name + ' is not currently playing a game.';
				secElapsed = 0;
				return;
			}

			if (firstCall) {
				if(arrData[2] < 0){
					spectate_div.innerHTML = '<b><i>' + name + '</i></b> has just started a <b><i>'
					+ arrData[1] + '</i></b> game!';
					return;
				}
				timer = setInterval(function (){myTimer(name,arrData[1],arrData[2])}, 1000);
				timer2 = setInterval(function (){myTimer2(name)}, 10000);
			}

		}
	});
}

function myTimer2(name) {
    get_status(name,false);
}

function myTimer(name,gameType,gameTime) {
	  secElapsed += 1;
    var spectate_div = document.getElementById("spectate");

		var updatedTime = parseInt(gameTime) + secElapsed;
		var minutes = Math.floor(updatedTime/60);
    var seconds = parseInt(updatedTime) - (minutes * 60);

		spectate_div.innerHTML = '<b><i>' + name + '</i></b> has been playing <b><i>'
		+ gameType + '</i></b> for <b><i>'
		+ minutes + ':' + n(seconds) + '</i></b> minutes.';
}

function n(n){
    return n > 9 ? "" + n : "0" + n;
}
