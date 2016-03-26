"use strict";
var isTimeoutRunning;

function main () {
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=";
	var end = "&format=json&jsoncallback=?";
	var input = document.querySelectorAll("body input");
	var button = document.querySelectorAll("body button");

	button[0].addEventListener("click", function (event) {
		window.clearTimeout(isTimeoutRunning);
		$.getJSON((url + input[0].value + end), function (flickrResponse){
			scrollImages(0, flickrResponse, input[1].value);
		});
	});	

	input[0].addEventListener("keydown", function (event) {
		if (event.which === 13) {
			window.clearTimeout(isTimeoutRunning);
			$.getJSON((url + input.value + end), function (flickrResponse){
			scrollImages(0, flickrResponse, input[1].value);
		});
		}
	})

	button[1].addEventListener("click", function () {
		window.clearTimeout(isTimeoutRunning);
	});
};

function scrollImages (cycle, obj, time) {
	var imgsrc = document.querySelector("body img");
	imgsrc.setAttribute("src", obj.items[cycle].media.m);	
	isTimeoutRunning = setTimeout(function() {
		console.log(isTimeoutRunning);
		cycle += 1;
		if (cycle === obj.items.length) {
			console.log("end reached");
			cycle = 0;
			return;
		}
		scrollImages(cycle, obj, time);
	}, (time*1000))
};

function allowDrop (ev) {
	ev.preventDefault ();
}

function onDragImage (ev) {
	console.log(ev.dataTransfer);
	ev.dataTransfer.setData("text", ev.target.src);
}

function onDrop (ev) {
	ev.preventDefault ();
	var data = ev.dataTransfer.getData("text");
	var clipboard = document.querySelector(".clipboard");
	var img = document.createElement("img");
	var eraseImg = document.querySelector("#drag");
	img.setAttribute("src", data);
	clipboard.appendChild(img);
	
	if (clipboard.offsetHeight < clipboard.scrollHeight) {
		alert("Too many Images!");
		img.remove();
	} else {
		eraseImg.setAttribute("src", "");
	}
}

//---------------------------------------------------------------------------------------------------------------

$(document).ready(main);

