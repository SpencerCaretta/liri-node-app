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
        console.log(response.ArtistData.name);
        console.log(response.EventData.VenueData.name);
        console.log(response.ArtistData.VenueData.city);
        console.log(response.ArtistData.VenueData.region);
        console.log(response.EventData.datetime);
    }
)

//spotify-this-song
var Spotify = require('node-spotify-api');

var spotify = Keys;

spotify
  .search({ type: 'track', query: process.argv[3].split(" ").join("%20") })
  .then(function(response) {
    console.log(response);
    console.log(response.artists.name);
    console.log(response.track.name);
    console.log(response.track.preview_url);
    console.log(response.track.album);
  })
  .catch(function(err) {
    console.log(err);
  });
//movie-this

//do-what-it-says
var fs = require("fs");

//read our random file and do the function described in the file
fs.readFile("random.txt", "utf8", function(err, data) {
    data;
    if (err) {
      return console.log(err);
    }
}
