//An array containing movie object from the last search
var currentResults = []

//An integer of the current shown movies from the current search
var currentShown = 0;


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
function advanced_search(title, actor, director, genre, country) {
	results = [];
	for (var key in movies_object) {
		match = true;
		var movieObject = movies_object[key];
		var movieActors = []; 
		var genres = genres_object[movieObject.id];

		try {
			var movieActors = movieObject.folk.split(',');
		} catch (e) {

		}

		if (title != '') {
			if (movieObject.otitle.toLowerCase().includes(title.toLowerCase())) {
				match = true;
			} else {
				match = false;
			}
		}


		if (actor != '') {
			var actorExists = movieActors.findIndex(item => item.toLowerCase().includes(actor.toLowerCase()) && match);
			if (actorExists != -1) {
				match = true;
			} else {
				match = false;
			}
		}

		if (director != '') {
			if (movieObject.dir.toLowerCase().includes(director.toLowerCase()) && match) {
				match = true;
			} else {
				match = false;
			}
		}

		if (genre != '') {
			try {
				var genreExist = genres.includes(genre.toLowerCase());
				if (genreExist && match) {
					match = true;
				} else {
					match = false;
				}

			} catch (e) {

			}
		}


		if (country != '') {
			if (movieObject.country.toLowerCase().includes(country.toLowerCase()) && match) {
				match = true;
			} else {
				match = false;
			}
		}

		if (match) {
			results.push(movieObject);
		}
	}
	currentShown = 0;
	return results;
}
/**
 * This function handles the fuzzy search
 * function.						
 * @param  {String} - The search query
 * @return {Array} - An array of objects
 */
function advanced_fuzzy_search(query) {
	var movies = [];
	for (var key in movies_object) {
		movies.push(movies_object[key])
	}
	//var genres = genres_object[movieObject.id];

	var titleMatch = function(o) {
		return o.otitle.toLowerCase().includes(query.toLowerCase());
	};

	var actorMatch = function(o) {
		var movieActors = []
		try {
			movieActors = o.folk.split(',');
		} catch (e) {

		}
		var match = movieActors.findIndex(o => o.toLowerCase().includes(query.toLowerCase()));
		if(match == -1){
			return false;
		}else{
			return true;
		}		
	};

	var directorMatch = function(o){
		return o.dir.toLowerCase().includes(query.toLowerCase());
	}

	var genreMatch = function(o){
		var genres = genres_object[o.id];
		try{
			return genres.includes(query.toLowerCase());
		}catch(e){
			return false;
		}
	}

	var countryMatch = function(o){
		return o.country.toLowerCase().includes(query.toLowerCase());
	}

	currentShown = 0;
	return movies.filter(a => titleMatch(a) || actorMatch(a) || directorMatch(a) || genreMatch(a) || countryMatch(a));
}

/**
 * This function search for all the movies with a title
 * containing the given search query.
 *
 * @param {String} titleQuery
 * @param {Array} data
 * @return {Array} results
 */
function search_title(titleQuery, data) {
	results = []
	for (var key in data) {
		var movieObject = data[key];
		if (movieObject.otitle.toLowerCase().includes(titleQuery.toLowerCase())) {
			results.push(movieObject);
		}
	}
	return results;
}

/**
 * This function loops through a list of movie elements
 * and appends them to the search results container.
 *
 * @param {Array} data - A list of movie objects 
 * @return {void}
 */
function display_results(data) {
	currentResults = data;

	var parent = document.getElementById('search-results');
	parent.innerHTML = "";
	//Loop through the array and append list items to a list

	var length = null;

	if (data.length > 10) {
		length = 10;
	} else {
		length = data.length
	}

	for (var i = 0; i < length; i++) {
		try {
			var obj = data[i];
			append_section(parent, obj);
		} catch (e) {
			console.log(e);
		}

	}

	check_current_shown();

	document.getElementById('shown-images').innerHTML = currentShown;
}


/**
 * This function appends a section to the given container.
 *
 * @param {Element} parent - The container to append to.
 * @param {Object} obj - A movie object 
 */
function append_section(parent, obj) {
	var outerSection = document.createElement('section');
	outerSection.classList.add('search-item');

	var imageDiv = document.createElement('div');
	imageDiv.classList.add('img-wrapper');

	var infoSection = document.createElement('section')
	infoSection.classList.add('information');

	get_image_element(obj.id, 'search-image', imageDiv);

	var movieLink = document.createElement('a');
	movieLink.classList.add('movieLink');
	movieLink.href = "./show_movie.html?id=" + obj.id;

	var title = document.createElement('h3');
	title.innerHTML = obj.otitle;

	var description = document.createElement('p');

	var descriptionString = "";
	try {
		descriptionString = obj.description;

		if (descriptionString.length > 500) {
			descriptionString = descriptionString.substring(0, 500) + '...';
		}
	} catch (e) {

	}

	description.innerHTML = descriptionString;


	movieLink.appendChild(title)
	infoSection.appendChild(movieLink);
	infoSection.appendChild(description);
	outerSection.appendChild(imageDiv);
	outerSection.appendChild(infoSection);

	parent.appendChild(outerSection);
	currentShown++;
};


/**
 * This function loads more search results, 10 by default
 * or more if parameter is declared.
 *
 * @param {Integer} amount - The amount of results to load.
 * @return {void}
 */
function load_more(amount = 10) {
	var length = null;

	if ((currentResults.length - currentShown) > amount) {
		length = amount;
	} else {
		length = (currentResults.length - currentShown);
	}

	var imagesToLoad = (currentShown + length);

	if ((currentResults.length - currentShown) != 0) {
		var parent = document.getElementById('search-results');
		for (var i = currentShown; i < imagesToLoad; i++) {
			append_section(parent, currentResults[i])
		}
	}

	check_current_shown();

	document.getElementById('shown-images').innerHTML = currentShown;
}

/**
 *
 * This function runs an advanced search. 
 * It is executed when the inputfields are changed. 
 *
 * @return{void}
 */
function do_advanced_search() {
	var title = document.getElementById('film_title').value;
	var actor = document.getElementById('actor').value;
	var director = document.getElementById('director').value;
	var genre = document.getElementById('genre').value;
	var country = document.getElementById('country').value;

	movies = advanced_search(title, actor, director, genre, country);
	var totals = document.querySelectorAll('.numberOfResults');
	for (var i = 0; i < totals.length; i++) {
		totals[i].innerHTML = movies.length;
	};

	display_results(movies);
}

function do_advanced_fuzzy_search(){
	var query = document.getElementById('fuzzy-search-input').value;
	movies = advanced_fuzzy_search(query);
	var totals = document.querySelectorAll('.numberOfResults');
	for (var i = 0; i < totals.length; i++) {
		totals[i].innerHTML = movies.length;
	};

	display_results(movies);
}

/**
 * Removes the loadMoreButton if there are 
 * no more images to be displayed.
 *
 * @return {Void} 
 */
function check_current_shown() {
	var button = document.getElementById('loadMoreButton');
	if (currentShown == currentResults.length) {
		button.style.display = 'none';
	} else {
		button.style.display = 'block';
	}
}

//Loads more results if the scroll more box is toggled
var infiniteScroll = false;
window.onscroll = function(ev) {
	if (currentShown < currentResults.length) {
		if (infiniteScroll) {
			if ((window.innerHeight + window.scrollY + 200) >= document.body.offsetHeight) {
				infiniteScroll = false;
				load_more(10);
				infiniteScroll = true;
			}
		}
	}
};



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



	var totals = document.querySelectorAll('.numberOfResults');
	for (var i = 0; i < totals.length; i++) {
		totals[i].innerHTML = results.length;
	};

	var film_titleTimer = null;
	var actorTimer = null;
	var directorTimer = null;
	var genreTimer = null;
	var countryTimer = null;
	var fuzzyTimer = null;


	var textInputs = document.querySelectorAll('input[type="text"]');

	//Adds eventlistener to all the textinputs in order to listen 
	//to when changes are made and a search is execute
	for (var i = 0; i < textInputs.length; i++) {
		textInputs[i].addEventListener('input', function() {
			query = this.value;
			clearTimeout(window[this.getAttribute('id') + 'Timer']);
			window[this.getAttribute('id') + 'Timer'] = setTimeout(function() {
				do_advanced_search();
			}, 500);
		});
	}

	var toggleInfinite = document.getElementById('toggleInfinite');
	toggleInfinite.addEventListener('change', function() {
		if (this.checked) {
			infiniteScroll = true;
		} else {
			infiniteScroll = false;
		}
	});

	var toggleSearchMode = document.getElementById('fuzzy-option');
	toggleSearchMode.addEventListener('change', function(){
		if (this.checked) {
			document.getElementById('fuzzy-search').style.display = 'flex';
			document.getElementById('search').style.display = "none";
		} else {
			document.getElementById('fuzzy-search').style.display = 'none';
			document.getElementById('search').style.display = "block";
		}
	})

	var fuzzyInput = document.getElementById('fuzzy-search-input');
	fuzzyInput.addEventListener('input', function(){
		query = this.value;
		clearTimeout(fuzzyTimer);
		fuzzyTimer = setTimeout(function() {
			do_advanced_fuzzy_search();
		}, 500);
	})
}