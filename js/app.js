//OVERLAY
    // Add overlay, image, caption, card variables
    var $overlay = $('<div id="overlay"></div>');
    var $card = $('<div id="card"></div>');
    var $image = $("<img>");
    var $caption = $("<span></span>");
    
    // Add counter variable for navigation SOON
    var $index = 0;
    
    //Append card to overlay
    $overlay.append($card);
    
    //Append image to overlay
    $card.append($image);
    
    //Append caption to overlay
    $card.append($caption);
    
    // Append overlay to body
    $("body").append($overlay);
    
    
    //EXIT OVERLAY BY CLICKING ON IT
        //	 When overlay is clicked
        	$overlay.click(function() {
        		//Hide/fade out overlay 
        		$overlay.fadeOut(500);
        	});	
    

//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=star+trek&r=json";

    //Retrieve info for movie
    function displayMovies(data) {
        var movieHTML = '<ul>';
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
    
    $.getJSON(omdbURL, displayMovies);
    
     //Put Movie on overlay
    function showMovie(item) {
        var item = $(item);
        
        var displayPoster = item.children("img").attr("src");
        console.log(displayPoster);
        $('#overlay img').attr("src", displayPoster);
                
        //Use movie ID to look up plot
        var displayID = item.children("p").eq(0).text();
        console.log(displayID);
        
        var displayTitle = item.children("h3").text();
        console.log(displayTitle);

        var displayYear = item.children("p").last().text();
        console.log(displayYear);
        $('#overlay span').html(displayTitle + "</br>" + displayYear + "</br>" + "temp");
        
        var omdbURLById = "https://www.omdbapi.com/?i=" + displayID + "&r=json";
        var movie;
        $.ajax(omdbURLById, { //New ajax gets plot info by ID
            complete: function(newXHR){
                movie = $.parseJSON(newXHR.responseText);
                console.log(movie.Plot);
                 $('#overlay span').html("Title: " + displayTitle + "</br></br>" + "Year: " + displayYear + "</br></br>" + "Plot: " + movie.Plot);
            }});

      }

    // When Click on Movie Image, open overlay with data for that movie clicked
    	$("#movie").on("click", "li", function(item) { //binding for generated content
           var item_to_show = $(this);
           showMovie(item_to_show);
           $overlay.fadeIn(500);
    	});


//AJAX Call - Flickr
var flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var flickrOpts = {
    tags: "kitten",
    format: "json"
};

    //Retrieve info for photo
    function displayPhotos(data) {
        var photoHTML = '<ul>';
        $.each(data.items, function (i, photo){
           photoHTML += '<li>';
           photoHTML += '<a href="' + photo.link + '">';
           photoHTML += '<img src="' + photo.media.m + '">';
           photoHTML += '<p class="hidden">' + photo.title + '</p>';
           photoHTML += '<p class="hidden">' + photo.date_taken + '</p>';
           photoHTML += '<p class="hidden">' + photo.author + '</p></a></li>';
        });
        photoHTML += '</ul>';
        $('#flickr').html(photoHTML);
    }
    
    $.getJSON(flickrURL, flickrOpts, displayPhotos);

	
	//Put Flickr photo info on overlay
	    function showPhoto(item) {
	        var item = $(item);
	        
	        var displayPhoto = item.children("img").attr("src");
	        console.log(displayPhoto);
	        $('#overlay img').attr("src", displayPhoto);
	        
	        var displayTitle = item.children("p").eq(0).text();
	        console.log(displayTitle);
	        
	        var displayDate = item.children("p").eq(1).text();
	        console.log(displayDate);
	
	        var displayAuthor = item.children("p").eq(2).text();
	        console.log(displayAuthor);
	        
	        $('#overlay span').html("Title and/or Description: " + displayTitle  + "<br/><br/>" + "Date: " + displayDate + "<br/><br/>" + "Author: " + displayAuthor);
	        
	      }
	
	// When Click on Photo Image, open overlay with data for that photo clicked
		$("#flickr").on("click", "li a", function(item) { //binding for generated content
	       event.preventDefault();
	       var item_to_show = $(this);
	       showPhoto(item_to_show);
	       $overlay.fadeIn(500);
		});
		
		
//Navigation goes here

//Sort goes here

