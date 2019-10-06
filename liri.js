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
        // console.log(ans.search);
        searchTerm();
    } else if (ans.search === 'spotify-this-song') {
        // console.log('spotify-this-song');
        searchTerm();
    } else if (ans.search === 'movie-this') {
        // console.log(ans.search);
        searchTerm();
    } else {
        // console.log('do-what-it-says');
        searchTerm();
    }
});

function searchTerm(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'searchSubject',
            message: 'What woud you like to search for?'
        }
    ]).then(function(ans){
        searchSpot(ans.searchSubject);
        // console.log(result);  
    })
}

function searchSpot(term){
    spotify.search({
        type: 'track',
        limit: 1,
        query: term
    }, function (err, data){
        if (err) throw err;
        console.log('\nArtist: ' + data.tracks.items[0].artists[0].name);
        console.log('--------------------------------------------------------');
        console.log('Song name: ' + data.tracks.items[0].name);
        console.log('--------------------------------------------------------');
        console.log('Link to song: ' + data.tracks.items[0].external_urls.spotify);
        console.log('--------------------------------------------------------');
        console.log('Album: ' + data.tracks.items[0].album.name);
    });
}