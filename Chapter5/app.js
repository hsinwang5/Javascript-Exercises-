//optional exercise: Create a website that retrieves images from Flickr when the user 
//submits a search term, and scroll through the images sequentially. 
var isTimeoutRunning;

var main = function() {
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=";
	var end = "&format=json&jsoncallback=?";
	var input = document.querySelector("body input");
	var button = document.querySelector("body button");
	var images = document.querySelector("body .images");

	var buttonPressed = false;

	button.addEventListener("click", function(event) {
		window.clearTimeout(isTimeoutRunning);
		var value;
		value = input.value;
		$.getJSON((url + input.value + end), function(flickrResponse){
			scrollImages(0, flickrResponse);
		});
	});	
};

var scrollImages = function(cycle, obj) {
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
		scrollImages(cycle, obj);
	}, 500)
};

$(document).ready(main);
