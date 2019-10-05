require('dotenv').config();
const moment = require('moment');
const axios = require('axios');
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');

const spotify = new Spotify(keys.spotify);
console.log(keys.spotify.id);