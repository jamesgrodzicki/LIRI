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

### Concert Search

This function will take an artist from the user, and give back information about their next upcoming concert. If they don't have a concert coming up then it will print that instead.
Information that will print:
* Name of the venue
* Location of the venue
* The date of the concert

##### Successful Search

![concert-this](/images/concert-this.png)

##### Failed Search

![concert-this-fail](/images/concert-this-fail.png)