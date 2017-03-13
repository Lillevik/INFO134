/* Her kan dere implementere en søkefunksjon. For eksempel:
function search_for_X() {
}
*/

/* Her kan dere implementere en display function som viser resulatetene av søket. For eksempel:
function display_X() {
}
*/
var currentResults = []


/**
 * Searches through the movie database file using all the
 * possible inputs if they are not empty.
 *
 * @param{String} title
 * @param{String} actor
 * @param{String} director
 * @param{String} genre
 * @param{String} country
 * @return {Array} An array of movie objects.
 */
function advanced_search(title, actor, director, genre, country){
	results = [];
	for (var key in movies_object){
		match = true;
		var movieObject = movies_object[key];
		var movieActors = [];
		var genres = genres_object[movieObject.id];

		try{
			var movieActors = movieObject.folk.split(',');
		}catch(e){

		}
		
		if(title != ''){
			if(movieObject.otitle.toLowerCase().includes(title.toLowerCase())){
				match = true;
			}else{
				match = false;
			}
		}
		
		
		if(actor != ''){
			var actorExists = movieActors.findIndex(item => item.toLowerCase().includes(actor.toLowerCase()) && match);
			if(actorExists != -1){
				match = true;
			}else{
				match = false;
			}
		}

		if(director != ''){
			if(movieObject.dir.toLowerCase().includes(director.toLowerCase()) && match){
				match = true;
			}else{
				match = false;
			}
		}

		if(genre != ''){
			try{
				var genreExist = genres.includes(genre.toLowerCase());
				if(genreExist && match){
					match = true;
				}else{
					match = false;
				}

			}catch(e){

			}
		}
		

		if(country != ''){
			if(movieObject.country.toLowerCase().includes(country.toLowerCase()) && match){
				match = true;
			}else{
				match = false;
			}
		}

		if(match){
			results.push(movieObject);
		}
	}
	return results;
}

/**
 * This function search for all the movies with a title
 * containing the given search query.
 *
 * @param {String} titleQuery
 * @param {Array} data
 * @return {Array} results
 */
function search_title(titleQuery, data){
	results = []
	for (var key in data) {
    	var movieObject = data[key];
		if(movieObject.otitle.toLowerCase().includes(titleQuery.toLowerCase())){
			results.push(movieObject);
		}
   	}
   	return results;
}


function display_results(data){
	console.log(data.length)
	console.log(data)
	currentResults = data;
	


	var parent = document.getElementById('search-results');
	parent.innerHTML = "";
	//Loop through the array and append list items to a list

	var length = null;

	if(data.length > 10){
		length = 10;
	}else{
		length = data.length
	}

	for (var i = 0; i < length; i++) {
		try{
			var obj = data[i];
			append_section(parent, obj);
		}catch(e){
			console.log(data[i]);
		}
		
	}
}



function append_section(parent, img){
	var imageUrl = get_image_url(img.id);
	var outerSection = document.createElement('section');
	outerSection.classList.add('search-item');

	var imageDiv = document.createElement('div');
	imageDiv.classList.add('img-wrapper');

	var infoSection = document.createElement('section')
	infoSection.classList.add('information');

	var image = new Image();
	image.src = imageUrl;
	image.classList.add('search-image')

	var title = document.createElement('h3');
	title.innerHTML = img.otitle;

	var description = document.createElement('p');
	description.innerHTML = img.description;


	imageDiv.appendChild(image);
	infoSection.appendChild(title);
	infoSection.appendChild(description);
	outerSection.appendChild(imageDiv);
	outerSection.appendChild(infoSection);

	parent.appendChild(outerSection);

	let index = currentResults.indexOf(img);
	if(index !== -1) {
		currentResults.splice(index, 1);
	}
};

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertAfter(newNode, referenceNode.nextSibling);
}

function load_more(amount){
	var length = null;
	console.log(currentResults)
	if(currentResults.length > amount){
		length = amount;
	}else{
		length = currentResults.length;
	}
	if(currentResults.length != 0){
		var parent = document.getElementById('search-results');
		for (var i = 0; i < length; i++) {
			append_section(parent, currentResults[i])
		}
	}
	console.log(currentResults)
}

/**
 *
 * This function runs an advanced search. 
 * It is executed when the inputfields are changed. 
 *
 * @return{void}
 */
function do_advanced_search(){
	var title = document.getElementById('film_title').value;
	var actor = document.getElementById('actor').value;
	var director = document.getElementById('director').value;
	var genre = document.getElementById('genre').value;
	var country = document.getElementById('country').value;

	movies = advanced_search(title, actor, director, genre, country);

	document.getElementById('numberOfResults').innerHTML = movies.length + ' results.';

	display_results(movies);
}


/**
 * 
 * Loads all the results from the title parameter in the url
 * and adds eventListeners to all the input field with a timeout
 * of half a second on each.
 */
window.onload = function() {
	query_params = get_query_string_parameters();

	var results = [];
	
	if (query_params.film_title) {
        film_title = query_params.film_title.toLowerCase();
		results = search_title(film_title, movies_object);
		display_results(results);
    }

    

	document.getElementById('numberOfResults').innerHTML = results.length + ' results.';


	var film_titleTimer = null;
	var actorTimer = null;
	var directorTimer = null;
	var genreTimer = null;
	var countryTimer = null;


	var textInputs = document.querySelectorAll('input[type="text"]');

	for (var i = 0; i < textInputs.length; i++) {
			textInputs[i].addEventListener('input',function(){
				query = this.value;
				clearTimeout(window[this.getAttribute('id') + 'Timer']);
				window[this.getAttribute('id') + 'Timer'] = setTimeout(function(){
					do_advanced_search();
			},500);
		});
	}
}

