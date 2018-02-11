# LIRI Bot

## Description: 
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Node Packages: 
twitter, node-spotify-api, dotenv, request, fs
## APIs: 
Spotify, Twitter, OMDB

## General Functionality:

### LIRI can accept 4 commands: 
* my-tweets:
Will pull the last 20 tweets for a user*
* spotify-this-song:
Accepts an additional argument which is then searched on to pull back the infomation on the first song Spotify returns (For song titles with spaces, be sure to quote wrap the entry to search on the full name)
* movie-this:
Accepts an additional argument which is then searched on to pull back the infomation on the first movie returned from the OMBD (For movie titles with spaces, be sure to quote wrap the entry to search on the full name)
* do-what-it-says
Accesses the file random.txt. The commands will be run that are entered on each line (If the command accepts additional arguments, separate it from the command with a comma. No spaces between the two)

All commands entered will be stored in a log.txt file
