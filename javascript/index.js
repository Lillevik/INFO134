function append_list_element(parent, obj){
	var link = document.createElement('a');
	link.href = 'show_movie.html?id=' + obj.id;
	link.classList.add('filmLink');


	var container = document.createElement('div');
	container.classList.add('film');

	var title = document.createElement('p');
	title.classList.add('filmTittel');
	title.innerHTML = obj.title;

	var filmDivPic = document.createElement('div');
	filmDivPic.classList.add('filmDivPic');

	var image = new Image() 
	image.src = get_image_url(obj.id);
	image.classList.add('filmPic')

	link.appendChild(container);
	container.appendChild(title);
	container.appendChild(filmDivPic);
	filmDivPic.appendChild(image);

	parent.appendChild(link);
};

window.onload = function(){
	const recentLoans = document.getElementById('lastLoaned');
	const myList = document.getElementById('myList');

	for(var key in last_loans){
		append_list_element(recentLoans, last_loans[key]);
	}

	for(var key in my_list){
		append_list_element(myList, my_list[key]);
	}


};

