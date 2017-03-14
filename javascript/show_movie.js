function panic(message) {
    // window.history.back();
    alert(message);
}

// function add_row(table, left, right) {
//    new_row = document.createElement("TR");
//    left_cell = document.createElement("TD");
//     left_cell.appendChild(left);
//     new_row.appendChild(left_cell);
//    
//    right_cell = document.createElement("TD");
//     right_cell.appendChild(right);
//     new_row.appendChild(right_cell);
//     
//     table.appendChild(new_row);
// }

window.onload = function() {
    query_params = get_query_string_parameters();
    if (!query_params.id) {
        panic("No id given");
        return;
    }
    
    // get the movie_object from the "database" movies_object
    movie_object = movies_object[query_params.id];
    if (!movie_object) {
	panic("Could not retrieve movie_object!");
	return;
    }
    
    var img_url = get_image_url(movie_object.id);
    append_image();

    // get the genre info (if it exists)
    genre_object = genres_object[query_params.id];
    // get the review info (if it exists)
    review_object = reviews_object[query_params.id];
    
    
    // render page
    var title_element = document.getElementById("otitle");
    var ntitle_element = document.getElementById("ntitle");
    var director_element = document.getElementById("directors");
    var cast_element = document.getElementById("cast");
    var country_element = document.getElementById("country");
    var year_element = document.getElementById("year");
    var length_element = document.getElementById("length");
    var summary_element = document.getElementById("summary");

    // Throw them in there
    title_element.innerHTML = movie_object["otitle"];
    ntitle_element.innerHTML = movie_object["ntitle"];
    director_element.innerHTML = movie_object["dir"];
    cast_element.innerHTML = movie_object["folk"];
    country_element.innerHTML = movie_object["country"];
    year_element.innerHTML = movie_object["year"];
    length_element.innerHTML = movie_object["length"];
    summary_element.innerHTML = movie_object["description"];
    
    // add a "debug-table" on the bottom showing all genre info
    genre_table = document.getElementById("genre_stat_table");
    for (var i in genre_object) {
		left = document.createTextNode(i);
		right = document.createTextNode(genre_object[i]);
		add_row(genre_table, left, right);
    }

    // review object debug-table
    review_table = document.getElementById("review_stat_table");
    for (key in review_object) {
	left = document.createTextNode(key);
	right = document.createTextNode(review_object[key]);
	add_row(review_table, left, right);
	for (subkey in review_object[key]) {
	    left = document.createTextNode(" -> " + subkey);
	    right = document.createTextNode(review_object[key][subkey]);
	    add_row(review_table, left, right);
	}
    }

    
    var imageUrls = get_multiple_images(query_params.id, 3);
    for (var i = 0; i < imageUrls.length; i++) {
        url = imageUrls[i];
        append_image(url);
    }
};
