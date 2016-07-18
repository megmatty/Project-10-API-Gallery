//AJAX Call - Flickr
var flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var flickrOpts = {
    tags: "startrek",
    format: "json"
};

    //Retrieve info for photo
    function displayPhotos(data) {
        var photoHTML = '<ul id="flickrGallery">';
        $.each(data.items, function (i, photo){
           photoHTML += '<li>';
           photoHTML += '<img src="' + photo.media.m + '">';
           photoHTML += '<p class="hidden">' + photo.title + '</p>';
           photoHTML += '<p class="hidden">' + photo.date_taken + '</p>';
           photoHTML += '<p class="hidden">' + photo.author + '</p></li>';
        });
        photoHTML += '</ul>';
        $('#flickr').html(photoHTML);
    }
    
    $.getJSON(flickrURL, flickrOpts, displayPhotos);

	//Put Flickr photo info on overlay
	    function showPhoto(item) {
	        var item = $(item);

            // go up the dom and find the first UL and assume it's the gallery, is it's ID
            currentSlideshowEl = item.parent('ul');

	        var displayPhoto = item.children("img").attr("src");
	        $('#overlay img').attr("src", displayPhoto);
	        
	        var displayTitle = item.children("p").eq(0).text();
	        
	        var displayDate = item.children("p").eq(1).text();
	
	        var displayAuthor = item.children("p").eq(2).text();
	        
	        $('#overlay span').html("<p>" + "Title: " + displayTitle + "</p>" + "<p>" + "Date: " + displayDate + "</p/>" + "<p>" + "Author: " + displayAuthor + "</p/>");
	        
	        //Update the index to the current item
	        $index = item.index();
	        
	        //Fade in the overlay
	        $overlay.fadeIn(500);
	        
	      }
	
	// When Click on Photo Image, open overlay with data for that photo clicked
		$("#flickr").on("click", "li", function(item) { //binding for generated content
	       var item_to_show = $(this);
	       showPhoto(item_to_show);
		});

    //Sorting by author
    $('#flickr-author-sort').click(function() {
        var photoItems = $('#flickrGallery li');
       photoItems.sort(mySortFunction);
        $('#flickrGallery').empty(); //empty the UL
        $('#flickrGallery').append(photoItems); //put in the new ordered items
        
        function mySortFunction(a, b) { 
             var text_a = $(a).children("p").eq(2).text().toUpperCase();
             var text_b = $(b).children("p").eq(2).text().toUpperCase();   
        
            if (text_a < text_b) return -1;
            if (text_a > text_b) return 1;
            if (text_a == text_b) return 0;
        }
    });

    //Sorting by date
    $('#flickr-date-sort').click(function() {
        var photoItems = $('#flickrGallery li');
        photoItems.sort(mySortFunction);
        $('#flickrGallery').empty(); //empty the UL
        $('#flickrGallery').append(photoItems); //put in the new ordered items
        
        function mySortFunction(a, b) { 
             var text_a = $(a).children("p").eq(1).text();
             var text_b = $(b).children("p").eq(1).text();   
        
            if (text_a < text_b) return -1;
            if (text_a > text_b) return 1;
            if (text_a == text_b) return 0;
        }
    });
