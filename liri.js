require('dotenv').config();
const moment = require('moment');
const axios = require('axios');
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');
const fs = require('fs');

const spotify = new Spotify(keys.spotify);

//This function starts the program and takes what the user would like to do

inquirer.prompt([
    {
        type: 'list',
        name: 'search',
        message: 'What would you like to search for?',
        choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    }
]).then(function (ans) {
    if (ans.search === 'concert-this') {
        concertThis();
    } else if (ans.search === 'spotify-this-song') {
        spotifyThisSong();
    } else if (ans.search === 'movie-this') {
        movieThis();
    } else {
        doWhatFileSays();
    }
});

//this takes the user's desired artist and creates the appropriate url

function concertThis(fileInput) {
    if (!fileInput) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'artist',
                message: 'Enter an artist to look-up an upcoming concert. '
            }
        ]).then(function (ans) {
            const queryURL = 'https://rest.bandsintown.com/artists/' + ans.artist + '/events?app_id=codingbootcamp&date=upcoming';
            concertGet(queryURL);
        });
    } else {
        const queryURL = 'https://rest.bandsintown.com/artists/' + fileInput + '/events?app_id=codingbootcamp&date=upcoming';
        concertGet(queryURL);
    }
}

//this function gets the data from the api 

function concertGet(searchURL) {
    axios({
        method: 'get',
        url: searchURL
    }).then(function (response) {
        console.log('\nVenue name: ' + response.data[0].venue.name);
        console.log('--------------------------------------------------------');
        console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region);
        console.log('--------------------------------------------------------');
        console.log('Date: ' + moment(response.data[0].datetime).format('MMM Do YY'));

    }).catch(function (error) {
        console.log('No upcoming concerts');
    });
}

//this function takes in the user's desired song

function spotifyThisSong(fileInput) {
    if (!fileInput) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'searchSong',
                message: 'What song would you like to search for? '
            }
        ]).then(function (ans) {
            spotGet(ans.searchSong);
        });
    } else {
        spotGet(fileInput);
    }
}

//this searches the spotify api to get data using the appropriate input

function spotGet(searchURL) {
    spotify.search({
        type: 'track',
        limit: 1,
        query: searchURL
    }).then(function (data) {
        printSong(data);
    }).catch(function (err) {
        spotify.search({
            type: 'track',
            limit: 1,
            query: 'Sign of the Times'
        }, function (err, data) {
            if (err) throw err;
            printSong(data);
        });
    });
}

//this prints the relevant information about the song

function printSong(songData) {
    console.log('\nArtist: ' + songData.tracks.items[0].artists[0].name);
    console.log('--------------------------------------------------------');
    console.log('Song name: ' + songData.tracks.items[0].name);
    console.log('--------------------------------------------------------');
    console.log('Link to song: ' + songData.tracks.items[0].external_urls.spotify);
    console.log('--------------------------------------------------------');
    console.log('Album: ' + songData.tracks.items[0].album.name);
}

//this takes the user's desired movie and creates the url

function movieThis(fileInput) {
    if (!fileInput) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'movie',
                message: 'Enter a movie. '
            }
        ]).then(function (ans) {
            const queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + ans.movie;
            movieGet(queryURL);
        });
    } else{
        const queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + fileInput;
        movieGet(queryURL);
    }
}

//this searches the OMDB api and prints the information to the console

function movieGet(searchURL) {
    axios({
        method: 'get',
        url: searchURL
    }).then(function (response) {
        console.log('\n```');
        console.log(response.data.Title);
        console.log(response.data.Released);
        console.log('IMDB: ' + response.data.Ratings[0].Value);
        console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
        console.log('```');
    }).catch(function (err) {
        console.log("Couldn't find movie");
    });
}

//this uses the text file to determine which search will be used and what item will be searched

function doWhatFileSays() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) throw error;
        let randomArr = data.split(', ')
        if (randomArr[0] === 'concert-this') {
            concertThis(randomArr[1]);
        } else if (randomArr[0] === 'spotify-this-song') {
            spotifyThisSong(randomArr[1]);
        } else if (randomArr[0] === 'movie-this') {
            movieThis(randomArr[1]);
        }
    });
}