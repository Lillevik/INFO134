/**
 * Returns a single image url.
 *
 * @return{String} url
 */
function get_image_url(id){
	var num = ((Math.ceil(id / 1000.0) * 1000) / 1000 ) - 1;
	return  'https://nelson.uib.no/o/' + num + '/' + id + '.jpg';	
};

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
	image.src = image_url;
	image.onload = function() {
	    // image exists and is loaded
	    document.body.appendChild(image);
	}
	image.onerror = function() {
		// image does not exist or did not load properly.
	}
}

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