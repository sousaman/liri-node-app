// Loading in the fs Node package to read and write files
var dotenv = require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");

// Global Variables
var action = process.argv[2];
var searchItem = process.argv[3];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Global Functions
function logCommand() {
    var text = action + ' ' + searchItem + '\n';
    fs.appendFile("log.txt", text, "utf8", function(err) {
        if (err) {
            console.log('An error occured writing to the log file: ' + err);
        };
    });
}

function myTweets() {
    client.get('statuses/user_timeline', { count: 20 }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } else {
        	for (var i = 0; i < tweets.length; i++) {
        		console.log(tweets[i].created_at + ': ' + tweets[i].text);
        	}
        }
    })
}

function spotifyThisSong(item) {
    if (item === undefined) {
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function(data) {
                console.log(data.artists[0].name);
                console.log(data.name);
                console.log(data.preview_url);
                console.log(data.album.name);
            }).catch(function(err) {
                console.log('Error occurred: ' + err);
            });
        //.request({ type: 'track', query: 'The Sign', limit: 50 }, function(err, data) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log(data.tracks.items);
        // }
        //});
    } else {
        spotify.search({ type: 'track', query: item, limit: 1 }, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                var info = data.tracks.items[0];
                var currArtists = info.artists;
                var output = '';
                if (currArtists.length === 1) {
                    output = currArtists[0].name;
                } else if (currArtists.length === 2) {
                    output = currArtists[0].name + ' (ft. ' + currArtists[1].name + ')';
                } else {
                    for (var i = 0; i < currArtists.length; i++) {
                        switch (i) {
                            case 0:
                                output += currArtists[i].name;
                                break;

                            case 1:
                                output += '(ft. ' + currArtists[i].name + ', ';
                                break;

                            case parseInt(info.artists.length) - 1:
                                output += currArtists[i].name + ')'

                            default:
                                output += currArtists[i].name + ', ';
                        }
                    }
                }
                console.log(output);
                console.log(info.name);
                console.log(info.preview_url);
                console.log(info.album.name);
            }
        });
    }
}

function movieThis(item) {
    if (item === undefined) {
        request('http://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody', function(error, response, body) {
            if (error || response.statusCode != 200) {
                console.log('The response did not return successfully. Status Code: ' + response.statusCode + ' \nError: ' + error);
            } else {
                var json = JSON.parse(body);
                console.log(json.Title);
                console.log(json.Year);
                console.log(json.imdbRating);
                console.log(json.Ratings[2].Value);
                console.log(json.Country);
                console.log(json.Language);
                console.log(json.Plot);
                console.log(json.Actors);
            }
        });
    } else {
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + item, function(error, response, body) {
            if (error || response.statusCode != 200) {
                console.log('The response did not return successfully. Status Code: ' + response.statusCode + ' \nError: ' + error);
            } else {
                var json = JSON.parse(body);
                console.log(json.Title);
                console.log(json.Year);
                console.log(json.imdbRating);
                console.log(json.Ratings[2].Value);
                console.log(json.Country);
                console.log(json.Language);
                console.log(json.Plot);
                console.log(json.Actors);
            }
        });
    }
}

// Logic

switch (action) {
    case 'my-tweets':
        logCommand();
        myTweets();
        break;

    case 'spotify-this-song':
        logCommand();
        spotifyThisSong(searchItem);
        break;

    case 'movie-this':
        logCommand();
        movieThis(searchItem);
        break;

    case 'do-what-it-says':
        logCommand();
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            var eachLine = data.split("\n");
            for (var i = 0; i < eachLine.length; i++) {
                var dataArr = eachLine[i].split(",");
                switch (dataArr[0]) {
                    case 'my-tweets':
                        logCommand();
                        myTweets();
                        break;

                    case 'spotify-this-song':
                        logCommand();
                        spotifyThisSong(dataArr[1]);
                        break;

                    case 'movie-this':
                        logCommand();
                        movieThis(dataArr[1]);
                        break;
                }
            }

        });

        break;
}