/** 
 * Skrevet av kandidat 141 og 250.
 * Returns a single image url.
 *
 * @return{String} url
 */
function get_image_url(id){
	var num = ((Math.ceil(id / 1000.0) * 1000) / 1000 ) - 1;
	return  'https://nelson.uib.no/o/' + num + '/' + id + '.jpg';	
};

function get_image_element(id, clas, parent){
	var image = new Image();
	image.src = get_image_url(id);
	image.classList.add(clas);

	image.onload = function() {
		parent.appendChild(image);
	}

	image.onerror = function() {
		var errorImage = new Image();
		errorImage.classList.add(clas);
		errorImage.src = './images/image-not-found.gif';
		parent.appendChild(errorImage);
	}
}

/**
 * This function returns multiple image urls. 
 *
 * @param{number} id
 * @param{number} numberOfImages
 * @return{Array} image_arr
 */
function get_multiple_images(id, numberOfImages){
	var num = ((Math.ceil(id / 1000.0) * 1000) / 1000 ) - 1;
	var letters = ['b','c','d','e','f']
	var image_arr = []
	for (var i = 0; i < numberOfImages - 1; i++) {
		image_arr.push('https://nelson.uib.no/o/' + num + '/' + id + letters[i] +'.jpg');
	}
	return image_arr;
};

/**
 * This function appends an image to the document 
 * body if the image is found on the server. 
 *
 * @return{void}
 */
function append_image(image_url){
	var image = new Image();
	var img_element = document.getElementById("movie_image");

	image.src = image_url;
	image.onload = function() {
	    // image exists and is loaded
	    // document.body.appendChild(image);
		img_element.appendChild(image);
	}
	image.onerror = function() {
		// image does not exist or did not load properly.
		console.log("no img");
	}
}
/**
 * Checks if an image exists
 * @param  {String} image_url - An url for an image
 * @return {Boolean} - True if it exists and false if not
 */
function validate_img_url(image_url){
	var image = new Image();
	image.src = image_url;
	image.onload = function() {
	    // image exists and is loaded
	    return true;
	}
	image.onerror = function() {
		// image does not exist or did not load properly.
		return false;
	}
};