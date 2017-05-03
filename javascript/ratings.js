function get_rating(id){
    // Get the reviews
    rating_object = reviews_object[id];
    if (!rating_object) {
        console.log("Movie " + id) + " has no reviews.";
        return;
    }

    //calculate rating
    var sum = 0;
    var num = 0;
    for(var key in rating_object) {
        var value = rating_object[key];
        sum = sum + value.rating;
        num = num + 1;
        console.log(value.rating)
    }
    var rating = Math.round((sum / num) * 10) / 10;
    return rating + " / 5";
}