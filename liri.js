require("dotenv").config();
var Keys = require("keys.js");

//Get user input for Bands in Town
var action = process.argv[2]
var input = process.argv[3].split(" ").join("%20");

//Actions
switch(action) {
case "concert-this":
    concertThis();
    break;
case "spotify-this-song":
    spotifyThis();
    break;
case "movie-this":
    movieThis();
    break;
case "do-what-it-says":
    doThis();
    break;
}

//Query for Bands in Town
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

//concert-this
//Require axios to make requests
var axios = require("axios")
axios.get(queryUrl).then(

    function(response) {
        console.log(response.data);
        console.log("Artist Name: " + response.ArtistData.name);
        console.log("Venue Name: " + response.EventData.VenueData.name);
        console.log("Venue City: " + response.ArtistData.VenueData.city);
        console.log("Venue Region: " + response.ArtistData.VenueData.region);
        console.log("Event Data/Time: " + response.EventData.datetime);
    }
)

//spotify-this-song
var Spotify = require('node-spotify-api');

var spotify = Keys;

spotify
  .search({ type: 'track', query: process.argv[3].split(" ").join("%20") })
  .then(function(response) {
    console.log(response);
    console.log("Artist Name: " + response.artists.name);
    console.log("Track Name: " + response.track.name);
    console.log("Preview URL: " + response.track.preview_url);
    console.log("Track Album: " + response.track.album);
  })
  .catch(function(err) {
    console.log(err);
  });
//movie-this

var queryUrl2 = "http://www.omdbapi.com/?t=" + input + "&apikey=trilogy";
var axios = require("axios")
axios.get(queryUrl2).then(
    function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings.RottenTomatoes);
        console.log("Country of Origin: " + response.data.Country);
        console.log("Language of Movie: " + response.data.Language);
        console.log("Plot of Movie: " + response.data.Plot);
        console.log("Actors in Movie: " + response.data.Actors);

    }
)


//do-what-it-says
var fs = require("fs");

//read our random file and do the function described in the file
fs.readFile("random.txt", "utf8", function(err, data) {
    console.log(data);
    if (err) {
      return console.log(err);
    }
}
