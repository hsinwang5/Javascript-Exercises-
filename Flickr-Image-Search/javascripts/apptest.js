//Testing random functionality not related to website
function main () {
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
	var testArray = [100, 32, 44, 44, 23, 32, 44, 56, 56];
	
	function no_dupes (arr) {
		var newArray = [];
		var uniques = [];
		var bool = true;
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < newArray.length; j++) {
				if (arr[i] === uniques[j]) {
					bool = false;
				}
			}
			if (bool) {
				newArray.push(arr[i]);
				uniques.push(arr[i]);
			}
			bool = true;
		}
		console.log(newArray);
	}
	no_dupes(testArray);
}