require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Get user input for Bands in Town
var action = process.argv[2]
var input = process.argv.slice(3).join("%20");

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

//concert-this function
function concertThis() {
    //Query for Bands in Town
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

    //Require axios to make requests
    var axios = require("axios")
    axios.get(queryUrl).then(

        function(response) {
            //console.log(response.data);
            console.log("Artist Name: " + input); //need to find the correct response names
            console.log("Venue Name: " + response.VenueData.name);
            console.log("Venue City: " + response.VenueData.city);
            console.log("Venue Region: " + response.VenueData.region);
            console.log("Event Data/Time: " + response.EventData.datetime);
        }
    )
}

//spotify-this-song
function spotifyThis(input) {
    var stringInput = input.toString();
    spotify
    .search({ type: 'track', query: stringInput })
    .then(function(response) {
        console.log(response);
        var firstResponse = response.tracks.items[0];
        var artistName = firstResponse.artists[0].name;
        var trackName = firstResponse.name;
        var previewURL = firstResponse.external_urls.spotify;
        var trackAlbum = firstResponse.album.name;
        console.log(firstResponse);
        console.log("Artist Name: " + artistName);
        console.log("Track Name: " + trackName);
        console.log("Preview URL: " + previewURL);
        console.log("Track Album: " + trackAlbum);
    })
    .catch(function(err) {
        console.log(err);
    });
}

//movie-this
function movieThis() {
    var queryUrl2 = "http://www.omdbapi.com/?t=" + input + "&apikey=trilogy";
    var axios = require("axios")
    axios.get(queryUrl2).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings.RottenTomatoes); //This is incorrect
            console.log("Country of Origin: " + response.data.Country);
            console.log("Language of Movie: " + response.data.Language);
            console.log("Plot of Movie: " + response.data.Plot);
            console.log("Actors in Movie: " + response.data.Actors);
    
        }
    )
}



//do-what-it-says
function doThis() {
    var fs = require("fs");

    //read our random file and do the function described in the file
    fs.readFile("random.txt", "utf8", function(err, data) {
        console.log(data);
        if (err) {
          return console.log(err);
        }
    })
}

