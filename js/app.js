//AJAX Call - Flickr
var flickrURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var flickrOpts = {
    tags: "cat",
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
    $('.wrapper').html(photoHTML);
}

$.getJSON(flickrURL, flickrOpts, displayPhotos);