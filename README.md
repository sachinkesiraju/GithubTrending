GithubTrending
==============

An unofficial API for retrieving Github's trending repositories written in Node.js.

<h2> Endpoints </h2>
<h3> Trending - (/trending) </h3> 

Returns all trending repos for languages specified in the 'languages' parameter as shown below.
To return overall trending repos, set 'languages' to 'trending'

Example: localhost:5000/trending?languages=objective-c&languages=ruby&languages=trending

Properties:
- Repo full name
- Repo owner
- Repo description
- Repo URL
- Repo starsToday

<strong> Response </strong>
```
[{"name":"kevinzhow/PNChart","owner":"kevinzhow","description":"A simple and beautiful chart lib used in Piner and CoinsMan for iOS","url":"https://github.com/kevinzhow/PNChart","language":"Objective-C","starsToday":"176"},{"name":"cwRichardKim/RKNotificationHub","owner":"cwRichardKim","description":"Make any UIView a full fledged notification center","url":"https://github.com/cwRichardKim/RKNotificationHub","language":"Objective-C","starsToday":"68"}]
```

<h3> Repo Details (/repo)</h3>
Returns the details of a repo passed in the 'repoName' parameter

Example: localhost:5000/repo?repoName=sachinkesiraju/GithubTrending

Properties:
- repo URL
- repo watchers
- repo total stars
- repo forks

<strong> Response </strong>
```
{"url":"https://github.com/sachinkesiraju/GithubTrending","watchers":"1","stars":"0","forks":"0"}
```
