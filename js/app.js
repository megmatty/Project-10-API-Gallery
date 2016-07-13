//AJAX Call - OMDB
var omdbURL = "https://www.omdbapi.com/?s=star+trek&plot=short&r=json";

function displayMovies(data) {
    var movieHTML = '<ul>';
    $.each(data.Search, function (i, movie){
       movieHTML += '<li>';
       movieHTML += '<img src="' + movie.Poster + '">';
        movieHTML += '<h3>' + movie.Title + '</h3>';
        movieHTML += '</li>';
    });
    movieHTML += '</ul>';
    $('#movie').html(movieHTML);
}

$.getJSON(omdbURL, displayMovies);


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