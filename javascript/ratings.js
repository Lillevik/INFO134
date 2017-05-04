// File for displaying a movie rating on the show_movie.html page.

// Function matches reviews and 
// movie id in the reviews.js object.
function get_rating(id){
    rating_object = reviews_object[id];
    if (!rating_object) {
        return;
    }

    //calculate rating
    var sum = 0;
    var num = 0;
    for(var key in rating_object) {
        var value = rating_object[key];
        sum = sum + value.rating;
        num = num + 1;
    }
    var rating = Math.round((sum / num) * 10) / 10;
    return rating + " / 5";
}