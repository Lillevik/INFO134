// Skrevet av kandidat 270.

// Prints and error if the 
// page is laoded wuthout
// a movie ID in the URL.
function panic(message) {
    alert(message);
}




// Run the script on page load.
window.onload = function() {

    // Get the movie ID from the URL.
    query_params = get_query_string_parameters();
    if (!query_params.id) {
        panic("No id given");
        return;
    }
    
    // Get the movie_object from the "database" movies_object.
    // Panic if no object is found.
    movie_object = movies_object[query_params.id];
    if (!movie_object) {
	   panic("Could not retrieve movie_object!");
	   return;
    }

    // Get the movie trailer if it has a trailer.
    var trailer_element = document.getElementById("movie_trailer");
    if(movie_object["youtube trailer id"].length>0){
        var trailer_url = movie_object["youtube trailer id"];
        var iframe = document.createElement("iframe");
        iframe.src = 'https://www.youtube.com/embed/' + trailer_url;
        trailer_element.appendChild(iframe);

    } else {
        trailer_element.innerHTML = "Trailer not available.";
        trailer_element.style.height = "auto";
    }


    // Function matches reviews and 
    // movie id in the reviews.js object.
    rating_object = reviews_object[query_params.id];
    var reviews_list = document.getElementById("reviews");
    if (rating_object == "undefined") {
        return;

    } else {
        // Calculate rating
        // and add the review to 
        // a list element at the same time.
        var sum = 0;
        var num = 0;
        for(var key in rating_object) {
            var value = rating_object[key];
            sum = sum + value.rating;
            num = num + 1;
        
            text = value.username + ": " + value.rating + "/5 - " + value.comment;
            list_item = document.createElement("LI");
            item_text = document.createTextNode(text);
            list_item.appendChild(item_text);
            reviews_list.appendChild(list_item);
        }

        if (sum == 0){
            var rating = "0/5 ";
            text = "No reviews yet.";
            list_item = document.createElement("LI");
            item_text = document.createTextNode(text);
            list_item.appendChild(item_text);
            reviews_list.appendChild(list_item);

        } else {
            var rating = (Math.round((sum / num) * 10) / 10) + " /5" ;
        }
    }
    

    // Get the image linked to the movie.
    var img_url = get_image_url(movie_object.id);
    append_image(img_url);

    // Get the genre object.
    // Match the movie ID to find the correct genre.
    genre_object = genres_object[query_params.id];

    // Get the reviews object.
    // Match the reviews with the movie ID.
    review_object = reviews_object[query_params.id];
    
    
    // Specify the elements on the page to populate.
    // These are existing fields in the HTML document.
    var title_element = document.getElementById("otitle");
    var ntitle_element = document.getElementById("ntitle");
    var director_element = document.getElementById("directors");
    var cast_element = document.getElementById("cast");
    var country_element = document.getElementById("country");
    var year_element = document.getElementById("year");
    var length_element = document.getElementById("length");
    var summary_element = document.getElementById("summary");
    var genre_element = document.getElementById("genre");
    var rating_element = document.getElementById("rating");
    var comment_element = 

    // Populate the HTML elements with the correct
    // info fetched from the different objects.
    title_element.innerHTML = movie_object["otitle"];
    ntitle_element.innerHTML = movie_object["ntitle"];
    director_element.innerHTML = movie_object["dir"];
    cast_element.innerHTML = movie_object.folk;
    country_element.innerHTML = "Country: " + movie_object["country"];
    year_element.innerHTML = "Year: " + movie_object["year"];
    length_element.innerHTML = movie_object["length"] + " min";
    summary_element.innerHTML = movie_object["description"];
    genre_element.innerHTML = genre_object[0];
    rating_element.innerHTML = rating;
    
    // Write it to the page.
    document.title = movie_object["otitle"];
};
