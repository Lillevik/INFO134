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
	const recentLoans = document.getElementById('innerLastLoaned');
	const myList = document.getElementById('innerMyList');

	for(var key in last_loans){
		append_list_element(recentLoans, last_loans[key]);
	}

	for(var key in my_list){
		append_list_element(myList, my_list[key]);
	}
	var rightTimer = null;
	var leftTimer = null;

	//Handling the right 'scroll' event
	var items = document.querySelectorAll('.more-content-right');
	for (var i = 0; i < items.length; i++) {

		items[i].addEventListener('mousedown', function(){
			var elem = this.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1];	
			rightTimer=setInterval(function(){
	          	
				var currentRightPos = parseInt(elem.style.right.split('px')[0]);
				var currentLeftPos = parseInt(elem.style.left.split('px')[0])
				var newRightPos;
				var newLeftPos;

				newRightPos = currentRightPos + 50;
				newLeftPos = currentLeftPos - 50;
				
				elem.style.right = newRightPos + 'px';
				elem.style.left = newLeftPos + 'px';
		     }, 100);	
		})

		items[i].addEventListener('mouseup', function(){
			clearInterval(rightTimer);
		})

	 	items[i].addEventListener('mouseover', function(){
	 		var arrow = this.childNodes[1];
	 		arrow.style.transform = "scale(1.2)"
	 		arrow.style.color = "white";
	 	});



	 	items[i].addEventListener('mouseout', function(){
	 		var arrow = this.childNodes[1];
	 		arrow.style.transform = "scale(1)"
	 		arrow.style.color = "rgba(255, 255, 255, 0.5)";
	 		clearInterval(rightTimer);
	 	});
	 } 

	//Handling the left 'scroll' event
	var items = document.querySelectorAll('.more-content-left');
	for (var i = 0; i < items.length; i++) {

		items[i].addEventListener('mousedown', function(){
			
			var elem = this.nextSibling.nextSibling.childNodes[1];
			var lastChilds = elem.childNodes;
			console.log(lastChilds[lastChilds.length - 1])
			leftTimer=setInterval(function(){

				var currentRightPos = parseInt(elem.style.right.split('px')[0]);
				var currentLeftPos = parseInt(elem.style.left.split('px')[0])	
				if(currentLeftPos < 0){

					var newRightPos;
					var newLeftPos;

					newRightPos = currentRightPos - 50;
					newLeftPos = currentLeftPos + 50;
					
					elem.style.right = newRightPos + 'px';
					elem.style.left = newLeftPos + 'px';
				}
			}, 100);
			
		})

		items[i].addEventListener('mouseup', function(){
			clearInterval(leftTimer);
		})

	 	items[i].addEventListener('mouseover', function(){
	 		var arrow = this.childNodes[1];
	 		arrow.style.transform = "scale(1.2)"
	 		arrow.style.color = "white";
	 	});

	 	items[i].addEventListener('mouseout', function(){
	 		var arrow = this.childNodes[1];
	 		arrow.style.transform = "scale(1)"
	 		arrow.style.color = "rgba(255, 255, 255, 0.5)";
	 		clearInterval(leftTimer);
	 	});
	 } 
};

