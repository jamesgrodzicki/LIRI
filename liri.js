require('dotenv').config();
const moment = require('moment');
const axios = require('axios');
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');

const spotify = new Spotify(keys.spotify);

inquirer.prompt([
    {
        type: 'list',
        name: 'search',
        message: 'What would you like to search for?',
        choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    }
]).then(function (ans) {
    if (ans.search === 'concert-this') {
        searchConcert();
    } else if (ans.search === 'spotify-this-song') {
        // console.log('spotify-this-song');
        searchSpot();
    } else if (ans.search === 'movie-this') {
        // console.log(ans.search);
        searchMovie();
    } else {
        // console.log('do-what-it-says');
        searchTerm();
    }
});

function searchConcert() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'artist',
            message: 'Enter an artist to look-up an upcoming concert. '
        }
    ]).then(function (ans) {
        const queryURL = 'https://rest.bandsintown.com/artists/' + ans.artist + '/events?app_id=codingbootcamp&date=upcoming';
        axios({
            method: 'get',
            url: queryURL
        }).then(function (response) {
            console.log('\nVenue name: ' + response.data[0].venue.name);
            console.log('--------------------------------------------------------');
            console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log('--------------------------------------------------------');
            console.log('Date: ' + moment(response.data[0].datetime).format('MMM Do YY'));

        }).catch(function (error) {
            console.log("couldn't find artist");
        });
    });
}

function searchSpot() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'searchSong',
            message: 'What song would you like to search for? '
        }
    ]).then(function (ans) {
        spotify.search({
            type: 'track',
            limit: 1,
            query: ans.searchSong
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
    });
}

function printSong(songData) {
    console.log('\nArtist: ' + songData.tracks.items[0].artists[0].name);
    console.log('--------------------------------------------------------');
    console.log('Song name: ' + songData.tracks.items[0].name);
    console.log('--------------------------------------------------------');
    console.log('Link to song: ' + songData.tracks.items[0].external_urls.spotify);
    console.log('--------------------------------------------------------');
    console.log('Album: ' + songData.tracks.items[0].album.name);
}

function searchMovie() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'movie',
            message: 'Enter a movie. '
        }
    ]).then(function(ans){
        const queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + ans.movie;
        console.log(queryURL);
        axios({
            method: 'get',
            url: queryURL
        }).then(function(response){
            console.log(response.data);
            console.log('\n```');
            console.log(response.data.Title);
            console.log('```');
        }).catch(function(err){
            console.log("Couldn't find movie");
        });
    });
}