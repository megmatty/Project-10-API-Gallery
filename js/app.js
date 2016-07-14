//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=star+trek&r=json";

function displayMovies(data) {
    var movieHTML = '<ul>';
    $.each(data.Search, function (i, movie){
       movieHTML += '<li>';
       movieHTML += '<img src="' + movie.Poster + '">';
       movieHTML += '<h3>' + movie.Title + '</h3>';
       movieHTML += '<p class="hidden">' + movie.imdbID + '</p>';
       movieHTML += '<p class="hidden">' + "Year: " + movie.Year + '</p></li>';
    });
    movieHTML += '</ul>';
    $('#movie').html(movieHTML);
}

$.getJSON(omdbURL, displayMovies);


//OVERLAY
    // Add overlay, image, caption, card variables
    var $overlay = $('<div id="overlay"></div>');
    var $card = $('<div id="card"></div>');
    var $image = $("<img>");
    var $caption = $("<span></span>");
    
    // Add counter variable for navigation
    var $index = 0;
    
    //Append card to overlay
    $overlay.append($card);
    
    //Append image to overlay
    $card.append($image);
    
    //Append caption to overlay
    $card.append($caption);
    
    // Append overlay to body
    $("body").append($overlay);
    
//Get poster, title, year and plot from the movie clicked
    function showMovie(item) {
        var item = $(item);
        
        var displayPoster = item.children("img").attr("src");
        console.log(displayPoster);
        $('#overlay img').attr("src", displayPoster);
        
        var displayTitle = item.children("h3").text();
        console.log(displayTitle);

        var displayYear = item.children("p").last().text();
        console.log(displayYear);
        $('#overlay span').html(displayTitle + "</br>" + displayYear);
        
        //use ID to look up plot?
        var displayID = item.children("p").first().text();
        console.log(displayID);

      }

// When Click on Movie Image, open overlay with data for that movie clicked
	$("#movie").on("click", "li", function(item) { //binding for generated content

       var item_to_show = $(this);
       
       showMovie(item_to_show);
    
        $overlay.fadeIn(500);
        
	});

//EXIT OVERLAY BY CLICKING ON IT
    
    //	 When overlay is clicked
    	$overlay.click(function() {
    		//Hide/fade out overlay 
    		$overlay.fadeOut(500);
    	});	






//AJAX Call - Flickr
var flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var flickrOpts = {
    tags: "kitten",
    format: "json"
};

function displayPhotos(data) {
    var photoHTML = '<ul>';
    $.each(data.items, function (i, photo){
       photoHTML += '<li>';
       photoHTML += '<a href="' + photo.link + '">';
       photoHTML += '<img src="' + photo.media.m + '"></a></li>';
    });
    photoHTML += '</ul>';
    $('#flickr').html(photoHTML);
}

$.getJSON(flickrURL, flickrOpts, displayPhotos);





