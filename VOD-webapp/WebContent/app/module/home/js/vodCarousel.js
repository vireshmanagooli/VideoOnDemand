$(document)
		.ready(
				function() {
					
					//query the url and get all the films details.
					$.get("https://demo2697834.mockable.io/movies", function( movies ) {
						  
						for(var i=0; i<movies.entries.length; i++ ){
							var movie = movies.entries[i];
							$(".owl-carousel").append("<div data-title='"+movie.title+"' data-img='"+movie.images[0].url+"' data-movie='"+movie.contents[0].url+"' class='item'><img src='"+movie.images[0].url+"'></img><span>"+movie.title+"</span></div>");
						}
						  
						//Create the carousel.
							$('.owl-carousel').owlCarousel({						
								loop : true,
								center:true,
								margin : 10,
								nav : true,
								responsive : {
									0 : {
										items : 1
									},
									600 : {
										items : 3
									},
									1000 : {
										items : 5
									}
								}
							});
							
							//add mouse click event on items
							$(".item").on("click", function(e){
								$(".center").removeClass("center");
								$(e.currentTarget).parent().addClass("center");
								
								var movie = $($(".center > div")[0]).data("movie");
								var title = $($(".center > div")[0]).data("title");
								var img = $($(".center > div")[0]).data("img");
								$("#myvideo").attr('src', movie);
								$("#myvideo")[0].load();
								
								//Update the History
								updateHistory(img, title, movie);
								
								//dynamically add the scr to video.
								toggleFullScreen();
							});	
					});
					
					
					//Add the key event.
					$(document.documentElement).keyup(function(event) {
						// handle cursor keys
						if (event.keyCode == 37) {
							// go left
							$('.owl-prev').click();
						} else if (event.keyCode == 39) {
							// go right
							$('.owl-next').click();					
						}

					});
					
					//Function to update the History.
					function updateHistory(img, title, videoURL){
						
						//Check whether clientId is present in localStore or not
						//If clientId is not present, then its the first time we are saving the data
						//If clientId is already present, then update the existing list
						
						// Check browser support
						if (typeof(Storage) !== "undefined") {
						   						    
						    var clientId = localStorage.getItem("clientId");
						    if(!clientId)clientId = "";
						    	
						    var history = {
						    		img: img,
						    		title: title,
						    		videoURL: videoURL,
						    		clientId: clientId
						    };						    						   
						    
						    $.post("http://localhost:1337/history/createOrUpdate", history)
						    .done(function(data) {
						    	 // Store
							    localStorage.setItem("clientId", data.clientId);
						    });
						} 
					}
					
					var videoElement = document.getElementById("myvideo");

					// method to toggle the full screen
					function toggleFullScreen() {
						if (!document.mozFullScreen
								&& !document.webkitFullScreen) {
							if (videoElement.mozRequestFullScreen) {
								videoElement.mozRequestFullScreen();
							} else {
								videoElement
										.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
							}
						} else {
							if (document.mozCancelFullScreen) {
								document.mozCancelFullScreen();
							} else {
								document.webkitCancelFullScreen();
							}
						}
					}

					// Go to full screen, when the enter key is pressed.
					document.addEventListener("keydown", function(e) {
						if (e.keyCode == 13) {				
							var movie = $($(".center > div")[0]).data("movie");
							var title = $($(".center > div")[0]).data("title");
							var img = $($(".center > div")[0]).data("img");
							$("#myvideo").attr('src', movie);
							$("#myvideo")[0].load();
							
							//Update the History
							updateHistory(img, title, movie);
							
							//dynamically add the scr to video.
							toggleFullScreen();
						}
					}, false);

					// Cancel the fullscreen once the video has been finished.
					videoElement.addEventListener('ended', function(e) {						
						if (document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
						} else {
							document.webkitCancelFullScreen();
						}
					}, false);

				});