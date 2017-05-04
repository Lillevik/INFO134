// Skrevet av kandidat 270 og 250.

// List all movies of a genre specified as a parameter.
function find_genres(category) {
    
    // Define the HTML list element to put it in.
    list_element = document.getElementById("categories");
    
    // Iterate over the genre object and 
    // pick out the instances that matches
    // The specified genre.
    for (i in genres_object){
        if(!genres_object[i].indexOf(category)){
            movie_details = movies_object[i];

            if(typeof movie_details !== "undefined"){
                list_item = document.createElement("LI");
                item_link = document.createElement("A");
                item_link.href = "show_movie.html?id=" + i;
                link_text = document.createTextNode(movie_details["otitle"]);
                item_link.appendChild(link_text);
                list_item.appendChild(item_link);
                list_element.appendChild(list_item);
            }
        }
    }
};

// Run the function on page load.
window.onload = function(){
    query_params = get_query_string_parameters();
    find_genres(query_params.category);
};
