//This application takes in an array of 5 objects representing a poker hand, 
//and returns what type of pair it is. 
//Straights and flushes are not considered, but can be implemented using Math.max and Math.min
var main = function () {
	"use strict";
	console.log("activated");
	//This hand contains Quads, the highest multi-card match rank possible in poker
	var hand1 = [
	{"rank": 3, "suit": "spades"},
	{"rank": 3, "suit": "diamonds"},
	{"rank": 3, "suit": "hearts"},
	{"rank": 7, "suit": "hearts"},
	{"rank": 3, "suit": "clubs"}
	];
	//11, 12, 13, and 14 are numerical representations of Jack, Queen, King, and Ace. 
	//Note that in implementation of straights the 14 also counts as a one
	var cardRanksArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

	var ranks = hand1.map(function (card) {
		return card.rank;
	});

	var result = containsNTimes(ranks, 5);
	console.log(result);

	console.log(pairType(hand1));
	
	//function takes 2 arugments: an array and a search term, 
	//and returns the amount of times that search term appears as a number
	function containsNTimes (array, search) {
		//check if argument is array
		if (array.constructor !== Array) {
			return alert("not an array");
		}
		var count = 0;
		var tracker = 0;
		while (array.indexOf(search, tracker) !== -1) {
			count += 1;
			tracker = (array.indexOf(search, tracker)) + 1;
		}
		return count;
	}

	//function returns what type of hand you have
	function pairType (hand) {
		var pairFound = 0;
		var tripsFound = 0;
		var quadsFound = 0;
		var result = "";
		var rank1;
		var rank2;
		var handArray = hand.map(function (card) {
			return card.rank;
		});
		cardRanksArray.forEach(function (rank) {
			switch (containsNTimes(handArray, rank)) {
				case 2: 
					pairFound += 1;
					break;
				case 3:
					tripsFound += 1;
					break;
				case 4:
					quadsFound += 1;
				default:
					result = "high card";
			} 
		});
		if (quadsFound === 1) {
			result = "You have quads! Congrats!";
		} else if (pairFound === 1 && tripsFound === 1) {
			result = "You have a full house!";
		} else if (tripsFound === 1) {
			result = "You have trips!";
		} else if (pairFound === 2) {
			result = "You have two-pair!";
		} else if (pairFound === 1) {
			result = "You have a pair!";
		} else {
			result = "You have nothing!";
		}
		return result;
	}
};

$(document).ready(main);
