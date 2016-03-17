document.addEventListener('DOMContentLoaded', function () {
	"use strict";

	var toDos = [
		"Finish writing this book",
		"Take Gracie to the park",
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new ToDos",
		"Get Groceries"
	];

	var tabs = document.querySelectorAll(".tabs a span");
	var content = document.querySelectorAll("main .content li");
	var ul = document.querySelectorAll(".content ul");
	
	var tabNumber;
	//removes input text box if there is one, does nothing if it's already gone
	function removeInput(){
		var input = document.querySelectorAll(".content input");
		var button = document.querySelectorAll(".content button");
		if (input[0]) {
			input[0].remove();
			button[0].remove();
		} else return;
	}
	//Add event listener to all 3 tabs, delete current active and make the clicked tab active
	for (tabNumber = 0; tabNumber <= 2; tabNumber++) {
		tabs[tabNumber].addEventListener("click", function (event) {
			for (var i = 0; i < tabs.length; i++) {
				tabs[i].classList.remove("active");
			};
			this.classList.add("active");
			for (var i = 0; i < content.length; i++) {
				content[i].innerHTML = "";

			}
			event.preventDefault();
			//execute DOM changes in the tab that was clicked
			if (tabs[0] == event.currentTarget) {
				var elem = document.querySelectorAll(".content li");
				//remove all list elements when tab is clicked
				for (var i = 0; i < elem.length; i++) {
					elem[i].remove();
				}
				//removes input from add tab if there is one
				removeInput();
				//dynamically recreate all list elements from toDos array
				for (var i = toDos.length-1; i >= 0; i--) {
					var node = document.createElement("li");
					var textnode = document.createTextNode(toDos[i]);
					node.appendChild(textnode);
					ul[0].appendChild(node);
				}
			}

			if (tabs[1] == event.currentTarget) {
				var elem = document.querySelectorAll(".content li");
				for (var i = 0; i < elem.length; i++) {
					elem[i].remove();
				}
				removeInput();
				for (var i = 0; i < toDos.length; i++) {
					var node = document.createElement("li");
					var textnode = document.createTextNode(toDos[i]);
					node.appendChild(textnode);
					ul[0].appendChild(node);
				}
			}
			//create input text box and submit button dynamically
			if (tabs[2] == event.currentTarget) {
				var elem = document.querySelectorAll(".content li");
				for (var i = 0; i < elem.length; i++) {
					elem[i].remove();
				}
				var mainContent = document.querySelectorAll(".content ul");
				var node = document.createElement("input");
				var node2 = document.createElement("button");
				var textnode = document.createTextNode("+");
				node2.appendChild(textnode);
				mainContent[0].appendChild(node);
				mainContent[0].appendChild(node2);
				var submit = document.querySelectorAll(".content button");
				submit[0].addEventListener("click", function (event) {
					var value = document.querySelectorAll(".content input");
					//push the text value into array if the text field is not blank
					if (value[0].value){
						toDos.push(value[0].value);
						value[0].value = "";
					}
				});
			}
		});
	}
});
