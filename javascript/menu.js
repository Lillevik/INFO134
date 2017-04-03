/**
 * Skrevet av kanditat 141.
 */

/**
 * Handles the opening of the mobile menu.
 * @return {Void} 
 */
function show_menu(){
	var elem = document.querySelector('.menu-list');
	var classes = elem.classList;
    classes.toggle('open');
    if(classes.contains('open')){
    	elem.style.right = '0';
    }else{
    	elem.style.right = '-200px'
    }
}


