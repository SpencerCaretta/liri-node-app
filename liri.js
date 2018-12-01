require("dotenv").config();


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
function spotifyThis() {

    var Spotify = require('node-spotify-api');
    var spotify = require("keys.js");

    spotify
    .search({ type: 'track', query: input })
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

