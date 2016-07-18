//OVERLAY
    // Add overlay, image, caption, card variables
    var $overlay = $('<div id="overlay"></div>');
    var $card = $('<div id="card"></div>');
    var $image = $("<img>");
    var $caption = $("<span></span>");

    // Add arrow variables
    var $nextArrow = $('<button class="next lnr lnr-chevron-right"</button>');
    var $prevArrow = $('<button class="prev lnr lnr-chevron-left"</button>');
    
    //Append card to overlay
    $overlay.append($card);
    
    //Append image to overlay
    $card.append($image);
    
    //Append buttons to overlay
    $overlay.append($prevArrow);
    $overlay.append($nextArrow);
    
    //Append caption to overlay
    $card.append($caption);
    
    // Append overlay to body
    $("body").prepend($overlay);
      

//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=star+trek&r=json";
$.getJSON(omdbURL, displayMovies);
    //Retrieve info for movie
    function displayMovies(data) {
        var movieHTML = '<ul id="movieGallery">';
        $.each(data.Search, function (i, movie){
           movieHTML += '<li>';
           movieHTML += '<img src="' + movie.Poster + '">';
           movieHTML += '<h3>' + movie.Title + '</h3>';
           movieHTML += '<p class="hidden">' + movie.imdbID + '</p>';
           movieHTML += '<p class="hidden">' + movie.Year + '</p></li>';
        });
        movieHTML += '</ul>';
        $('#movie').html(movieHTML);
    }
    
     //Put Movie on overlay
    function showMovie(item) {
        var item = $(item);
        
        // go up the dom and find the first UL and assume it's the gallery, is it's ID
        currentSlideshowEl = item.parent('ul');
        
        var displayPoster = item.children("img").attr("src");
        $('#overlay img').attr("src", displayPoster);
                
        //Use movie ID to look up plot
        var displayID = item.children("p").first().text();
        
        var displayTitle = item.children("h3").text();

        var displayYear = item.children("p").last().text();
        
        var omdbURLById = "https://www.omdbapi.com/?i=" + displayID + "&r=json";
        var movie;
        $.ajax(omdbURLById, { //New ajax gets plot info by ID
            complete: function(newXHR){
                movie = $.parseJSON(newXHR.responseText);
                $('#overlay span').html("<p>" + "Title: " + displayTitle + "</p>" + "<p>" + "Year: " + displayYear + "</p>" + "<p>" + "Plot: " + movie.Plot + "</p>");
            }});
        
        //Update the index to the current item
        $index = item.index();
        
        //Fade in the overlay
        $overlay.fadeIn(500);
      }

    // When Click on Movie Image, open overlay with data for that movie clicked
    	$("#movie").on("click", "li", function (item) { //binding for generated content
           var item_to_show = $(this);
           showMovie(item_to_show);
    	});


//OVERLAY IMAGE NAVIGATION
    
    // Add counter variable for navigation
    var $index = 0;
  	var currentSlideshowEl = null; //global slideshow variable to hold which gallery
  	
    function slideShowUpdate(move) { //function for updating the overlay img when prev/next clicked
        
        var $galleryLength = currentSlideshowEl.find("li").length; //holds the length of the gallery list items
        
        $index += move; //variable to advance or retreat
        
    	if ($index < 0) { //sets correct index when going backward
    	    $index = $galleryLength - 1;
    	} 
    	
    	if ($index >= $galleryLength) { //loops back to first image when end is reached
    	    $index = 0;	
    	} 
    
    	var item_to_show = currentSlideshowEl.find("li").eq($index); //selects an item with the current index number	
       
       var func = showMovie;
       
       if (currentSlideshowEl.attr('id') == 'flickrGallery') { //if in the flickrgallery
           func = showPhoto; //run the function to show photos
       }
       
        func(item_to_show);
    }



//PREV_NEXT ARROW FUNCTIONS

    //When Left Arrow is clicked
    $prevArrow.click(function(event) {
            slideShowUpdate(-1);
    	    return false; //keeps overlay from closing when clicking arrow
    });
    
    //When Right Arrow is clicked
    $nextArrow.click(function(event) {
            slideShowUpdate(1);
       	    return false; 
    });
    
    $(document).keydown(function(event) {
        if (event.which === 37) { //keycode for left arrow key
            slideShowUpdate(-1); //move -1
        } else if (event.which === 39) { //keycode for right arrow key
            slideShowUpdate(1); //move +1
        }
    });


//SORT BUTTONS

    //Sorting by title
    $('#movie-title-sort').click(function() {
        var movieItems = $('#movieGallery li');
         $('#movieGallery').empty(); //empty gallery
        movieItems.sort(mySortFunction);
        $('#movieGallery').append(movieItems); //add new items
        
        
        function mySortFunction(a, b) { 
             var text_a = $(a).children("h3").text().toUpperCase();
             var text_b = $(b).children("h3").text().toUpperCase();   
        
            if (text_a < text_b) return -1;
            if (text_a > text_b) return 1;
            if (text_a == text_b) return 0;
        }
    });

    //Sorting by year
    $('#movie-year-sort').click(function() {
        var movieItems = $('#movieGallery li');
        $('#movieGallery').empty(); //empty gallery
        movieItems.sort(mySortFunction);
        $('#movieGallery').append(movieItems); //add new items
        function mySortFunction(a, b) { 
             var text_a = $(a).children("p").last().text();
             var text_b = $(b).children("p").last().text();   
        
            if (text_a < text_b) return -1;
            if (text_a > text_b) return 1;
            if (text_a == text_b) return 0;
        }
    });



//EXIT OVERLAY BY CLICKING ON IT - must be last
//    	 When overlay is clicked
    	$overlay.click(function() {
    		//Hide/fade out overlay 
    		$(this).fadeOut(500);
    	});	



