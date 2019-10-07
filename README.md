# LIRI

![prompt-screen](/images/prompt-screen.png)

This is LIRI. It is a command line interface where the user can search for 3 different things. They can search for information about concerts, songs, or movies. Once the user selects what they would like to search for, they will be prompted again to enter their desired artist/song/movie. Then LIRI will request from the __bandsintown__ API, the __spotify__ API, or the __OMDB__ API and will print interesting information about the search to the console.

## Packages Used

* dotenv
* moment
* axios
* node-spotify-api
* inquirer
* fs

## Concert Search

This function will take an artist from the user, and give back information about their next upcoming concert. It uses the __bandsintown__ API as well as axios to get the information. If they don't have a concert coming up then it will print that instead.
Information that will print to console:
* Name of the venue
* Location of the venue
* The date of the concert

##### Successful Search

![concert-this](/images/concert-this.png)

##### Failed Search

![concert-this-fail](/images/concert-this-fail.png)

## Song Search

This function will take any song input from the user and will give back information about it. It uses the __spotify__ API and the spotify api node package to perform the request. If it get a response then the function will automatically search _Sign of the Times_ instead.
Information that will print to console:
* Artist the song is made by
* Song name
* Link to play the song in Spotify
* Album the song is from

##### Successful Search

![spotify-this](/images/spotify-this.png)

##### Failed Search

![spotify-this-fail](/images/spotify-this-fail.png)

## Movie Search