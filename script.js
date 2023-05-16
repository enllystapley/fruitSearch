
// the input text field and the ul elements from the dom save into usable variables
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

// a prepopulated array of fruits to use in the suggestions in the ul list
const fruit = ['apple', 'apricot', 'avocado 🥑', 'banana', 'bilberry', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'currant', 'cherry', 'coconut', 'cranberry', 'cucumber', 'custard apple', 'damson', 'date', 'dragonfruit', 'durian', 'elderberry', 'feijoa', 'fig', 'gooseberry', 'grape', 'raisin', 'grapefruit', 'guava', 'honeyberry', 'huckleberry', 'jabuticaba', 'jackfruit', 'jambul', 'juniper berry', 'kiwifruit', 'kumquat', 'lemon', 'lime', 'loquat', 'longan', 'lychee', 'mango', 'mangosteen', 'marionberry', 'melon', 'cantaloupe', 'honeydew', 'watermelon', 'miracle fruit', 'mulberry', 'nectarine', 'nance', 'olive', 'orange', 'clementine', 'mandarine', 'tangerine', 'papaya', 'passionfruit', 'peach', 'pear', 'persimmon', 'plantain', 'plum', 'pineapple', 'pomegranate', 'pomelo', 'quince', 'raspberry', 'salmonberry', 'rambutan', 'redcurrant', 'salak', 'satsuma', 'soursop', 'star fruit', 'strawberry', 'tamarillo', 'tamarind', 'yuzu'];
// a alphabet array i created to compare if the key pressed was a letter, i wanted instead to use a regular expression, but i dont yet understand how to use them.
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// an array i created to store the keypress values so i can better make suggestions based on the stored keypress values
let keyPressData = [];
// the search function take the input from the searchHandler function, specifically it take the search string made in the searchHandler
function search(str) {

	// this creates a filtered array from the fruits array provided to make sure the results array includes only items that have the string passed from searchHandler
	let results = fruit.filter(function(value){
		return value.includes(str);
	})
	//returns the results array to show suggestions
	return results;
}
// after something is pressed in the input textfield, we add it to the keypress array here
function searchHandler(e) {
	//create a variable in block scope to hold the value of the key pressed
	let tempVal = e.key;
	let searchString = "";
	//if the value of the key pressed is part of the alphabet, turn the value into a string and set it to lower case, and add it to the key pressed array i created above
	if(alphabet.includes(tempVal)){
		//val from key press turns to a string and goes to lower case here
		let finalVal = tempVal.toString().toLowerCase();
		//add the lowercase string value just created into an array called keyPressData
		keyPressData.push(finalVal);
		//combines all elements from the keypress data array into a string
		searchString = keyPressData.join('');
		//calls showsuggestions function and provides it with with the results array returned from the seach function
		showSuggestions(search(searchString), searchString);
	//if they delete something that they entered it take the value out of the keyPressData	
	}else if(tempVal === "Backspace"){
		//removes last val entered in array
		keyPressData.pop();
		//rejoins the array and sets the search string array
		searchString = keyPressData.join('');
		//calls showsuggestions function and provides it with with the results array returned from the seach function
		showSuggestions(search(searchString), searchString);
	}
	
	
}

function showSuggestions(results, inputVal) {
	// this line first emptys out the ul of all list items each time a new character is added to the seachstring
	suggestions.innerHTML = "";
	// then i use a for of loop to populate the list items in the suggestions ul as long as there is at least 1 characte in the search string
		if(inputVal.length >= 1){
			for(let result of results){
			// creates the li node
			let elem = document.createElement('li'); // is a node
			// set the node text to the item in the results array
			elem.innerText = result;
			// adds the li with the value of the array item to the parent ul
			suggestions.appendChild(elem);
		}
		}
		
	
	}



function useSuggestion(e) {
	// saves the choice that was clicked on into a variable
	let choice = e.target.innerText;
	// assigns a value to the input from the saved choice
	input.value = choice;
	// clears the suggestion list
	suggestions.innerHTML = "";
	// clears the key press array just in case they want to keep searching after they delete the input value selected
	keyPressData = [];

}
// when something is entered into the text input we listen for the keyup event, when a keyup is detected it is passed to the searchHandler function
input.addEventListener('keyup', searchHandler);
//when one of the list items li's that were added to the suggestions ul are clicked on it send the code to the useSuggestion function.
suggestions.addEventListener('click', useSuggestion);