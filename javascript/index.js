/**
 * Skrevet av kandidat 141 og 250.
 * This function appends the users specific
 * elements to the containers on the indes page.
 * @param  {Element} parent The parent container
 * @param  {Object} obj - A movie object
 * @return {Void} Returns nothing
 */
function append_list_element(parent, obj){
	var singleMovieContainer = document.createElement('div');
	singleMovieContainer.classList.add('single-movie-container');

	var singleMovieWrapper = document.createElement('div');
	singleMovieWrapper.classList.add('single-movie-wrapper');

	var singleMovieTitle = document.createElement('div');
	singleMovieTitle.classList.add('single-movie-title');

    var link = document.createElement('a');
    link.href = 'show_movie.html?id=' + obj.id;
    link.classList.add('movie-link')

	var title = document.createElement('p');
	title.innerHTML = obj.title;

	var singleMovieImgContainer = document.createElement('div');
	singleMovieImgContainer.classList.add('single-movie-img-container');

	var filmPic = document.createElement('img');
	filmPic.classList.add('filmPic');
	filmPic.src = get_image_url(obj.id);


	singleMovieTitle.appendChild(title)
    link.appendChild(singleMovieWrapper)
	singleMovieImgContainer.appendChild(filmPic)
	singleMovieWrapper.appendChild(singleMovieTitle)
	singleMovieWrapper.appendChild(singleMovieImgContainer)
	singleMovieContainer.appendChild(link)

	parent.appendChild(singleMovieContainer);
};

function add_elements(container, objects){
    for(var key in objects){
        append_list_element(container, objects[key]);
    }
}

/**
 * This function loads the elements
 * on this index page when the document
 * has finished loading.
 * @return {Void} 
 */
window.onload = function(){
    //Create array of containers and their objects
	const containers =
	[
		{'recent-loans':last_loans},
		{'my-list':my_list},
		{'recommendations':my_list}
	]

    //Add all the objects to the containers
	for(var i = 0;i<containers.length;i++){
	    var key = Object.keys(containers[i])[0];
		var container = document.getElementById(key);
		var objects = containers[i][key];
		add_elements(container, objects);
	}
};

