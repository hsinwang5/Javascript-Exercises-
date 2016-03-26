//Jquery version by Semmy Purewal
var test = function() {
	alert("this worked");
};

var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	})
    
	$(".tabs a span").toArray().forEach(function(element) {
		$(element).on("click", function() {
			var $element = $(element),
				$content;
			
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = toDos.length-1; i >= 0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
				console.log(toDos);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				console.log("the tabs tag was clicked!");

				var tagsArr = [];
				toDoObjects.forEach(function(elements) {
					elements.tags.forEach(function(tag) {
						if (tagsArr.indexOf(tag) === -1) {
							tagsArr.push(tag);
						}
					})
				});
				var toDos2 = tagsArr.map(function(tags){
					var toDosWithTag = [];
					toDoObjects.forEach(function(obj){
						if (obj.tags.indexOf(tags) !== -1) {
							toDosWithTag.push(obj.description);
						}
					});
					return {"name": tags, "toDos": toDosWithTag};
				});

				toDos2.forEach(function(tag) {
					var $tagName = $("<h3>").text(tag.name)
					var $content = $("<ul>");

					tag.toDos.forEach(function(description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				var $input = $("<input>");
				var $desc = $("<input>");
				var $button = $("<button>").text("+");
				var $text = $("<p>").text("Task:");
				var $text2 = $("<p>").text("Tag:")
				var $content2;
				
				$button.on("click", function () {
                    if ($input.val() !== "" && $desc.val() !== "") {
                    	var tags = $desc.val().split(",");
                        toDoObjects.push({
                        	"description": $input.val(),
                        	"tags": tags
                        });
                        toDos.push($input.val());
                        $input.val("");
                        $desc.val("");
                    } else {
                    	alert("Please input values for both description and tag!");
                    }
                });

				$content2 = $("<div>").append($desc).prepend($text2);
                $content = $("<div>").append($input).append($button).prepend($text);
                $("main .content").append($content2);
                $("main .content").append($content);
			}
					
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});
