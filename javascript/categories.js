
// List all movies of a specific genre
function find_genres(category) {
    
    // Define the list to put it in
    list_element = document.getElementById("categories");
    
    // Look at all movies with genre
    for (i in genres_object){
    
        // Check for the correct genre
        if(!genres_object[i].indexOf(category)){
            
            // Bind the genre_object to the movie_object using ID
            movie_details = movies_object[i];

            // Check if the movie and genre objects are not connected
            if(typeof movie_details === "undefined"){
                console.log("undefined - " + i );
                    
            } else {

            // make the listelements and links in html
            list_item = document.createElement("LI");
            item_link = document.createElement("A");

            // set the links to redirect to the specific movie with title
            item_link.href = "show_movie.html?id=" + i;
            link_text = document.createTextNode(movie_details["otitle"]);
            item_link.appendChild(link_text);
            list_item.appendChild(item_link);
            list_element.appendChild(list_item);

            }

        } else {
            // console.log("NO.. " + "i-" + i + ", c-" + count + ", " + genres_object[i]);
        }
    }
};

window.onload = function(){
    query_params = get_query_string_parameters();
    
    find_genres(query_params.category);
};
