require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");

//Get user input 
var action = process.argv[2]
var input = process.argv.slice(3).join(" ");

function runCommands(p1, p2) {
    //Actions
    switch(p1) {
        case "concert-this":
            concertThis(p2);
            break;
        case "spotify-this-song":
            if (!p2) {
                spotifyThis("Ace of Base");
            } else {
                spotifyThis(p2);
            }
            break;
        case "movie-this":
            if (!p2) {
                movieThis("Mr. Nobody");
            } else {
                movieThis(p2);
            }
            break;
        case "do-what-it-says":
            doThis();
            break;
        }
}
//Run the commands with our inputs
runCommands(action, input);

//concert-this function
function concertThis(input) {
    //Get rid of spaces
    var inputSpaces = input.replace(" ", "%20");
    //Query for Bands in Town
    var queryURL = "https://rest.bandsintown.com/artists/" + inputSpaces + "/events?app_id=codingbootcamp";

    //Require axios to make requests
    var axios = require("axios")
    axios.get(queryURL).then(

        function(response) {
            //get all the data from Bands in Town
            var allData = response.data;

            //only prints out info if there is data
            if (allData.length > 0) {
                var getURL = allData[0].url;

                //goes through all the information and prints out each of the concerts
                for (var i = 0; i < allData.length; i++) {
                    //Takes the user's input and lists out their concerts, increasing the concert number by 1 each loop
                    var concertData = i + 1;
                    concertData = '\n' + input.toUpperCase() + " Concert#" + concertData + ":";

                    //grabs the concert Venue
                    var concertVenue = allData[i].venue.name;
                    concertVenue = "\nVenue: " + concertVenue;

                    // grabs the location city
                    var city = allData[i].venue.city;
                    city = "\nCity: " + city;

                    // grabs the lovation region (i.e. state)
                    var region = allData[i].venue.region;
                    region = "\nRegion: " + region;

                    // uses moment to grab the datetime and put it in the 'MM/DD/YYYY' format
                    var concertTime = allData[i].datetime;
                    concertTime = concertTime.substring(0, 10);
                    concertTime = moment(concertTime).format('MM/DD/YYYY');
                    concertTime = "\nDate: " + concertTime;

                    console.log(concertData + concertVenue + city + region + concertTime);
                }
            }
            // console.log(response.data);
            // console.log("Artist Name: " + inputSpaces); //need to find the correct response names
            // console.log("Venue Name: " + response.VenueData.name);
            // console.log("Venue City: " + response.VenueData.city);
            // console.log("Venue Region: " + response.VenueData.region);
            // console.log("Event Data/Time: " + response.EventData.datetime);
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
            artistName = "\nArtist Name: " + artistName;
            //console.log("\nArtist Name: " + artistName);
            var trackName = firstResponse.name;
            trackName = "\nTrack Name: " + trackName;
            //console.log("\nTrack Name: " + trackName);
            var previewURL = firstResponse.external_urls.spotify;
            var display = "\nPreview URL: " + previewURL;
            //console.log("\nPreview URL: " + previewURL);
            var trackAlbum = firstResponse.album.name;
            trackAlbum = "\nTrack Album: " + trackAlbum;
            //console.log("\nTrack Album: " + trackAlbum);
            
            //Log everything at once
            console.log(aristName + trackName + display + trackAlbum);
            
            
            
            
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
            //console.logs self explanatory -- will log out data we want when command is run
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Origin: " + response.data.Country);
            console.log("Language of Movie: " + response.data.Language);
            console.log("Plot of Movie: " + response.data.Plot);
            console.log("Actors in Movie: " + response.data.Actors);
    
        }
    )
}



//do-what-it-says
function doThis() {

    //read our random file and do the function described in the file
    fs.readFile("random.txt", "utf8", function(err, data) {
        console.log(data);
        if (err) {
          return console.log(err);
        }
        // take the data from our random.txt file and split it by the comma, put into array
        var array = data.split(",")

        // since our text file is set up with a (function, input), function is in spot 0 and input is in spot 1
        txtFunction = array[0];

        txtInput = array[1];

        //use our command to run the data in the random.txt file
        runCommands(txtFunction, txtInput);
    })
}

