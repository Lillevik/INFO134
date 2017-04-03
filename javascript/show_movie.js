function panic(message) {
    // window.history.back();
    alert(message);
}

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

    // FIND THAT MOVIE TRAILER !!!1!
    var trailer_element = document.getElementById("movie_trailer");
    if(movie_object["youtube trailer id"].length>0){

        var trailer_url = movie_object["youtube trailer id"];
        var iframe = document.createElement("iframe");
        iframe.src = 'https://www.youtube.com/embed/' + trailer_url;
        trailer_element.appendChild(iframe);
    } else {
        trailer_element.innerHTML = "no trailer";
    }
    
    var img_url = get_image_url(movie_object.id);
    append_image(img_url);

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
    var genre_element = document.getElementById("genre");
    var rating_element = document.getElementById("rating")

    // Throw them in there
    title_element.innerHTML = movie_object["otitle"];
    ntitle_element.innerHTML = movie_object["ntitle"];
    director_element.innerHTML = movie_object["dir"];
    cast_element.innerHTML = movie_object.folk;
    country_element.innerHTML = "Country: " + movie_object["country"];
    year_element.innerHTML = "Year: " + movie_object["year"];
    length_element.innerHTML = movie_object["length"] + " min";
    summary_element.innerHTML = movie_object["description"];
    genre_element.innerHTML = genre_object[0];
    
    document.title = movie_object["otitle"];
};
