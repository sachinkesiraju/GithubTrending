var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.get('/trending', function(req, res){
    //Scrape the github trending site
    var url = 'https://github.com/trending';
    var repos = [];

    request(url, function(error, response, html){
        if(!error) {
            var $ = cheerio.load(html);

             $('li.repo-list-item').each(function onEach () {
            var repository = {};
            var $elem = $(this);
            var language = $elem.find('.repo-list-meta').text().split('•');
            var starsTodayUncut = $elem.find('.repo-list-meta').text().split('•');
            var starsToday = starsTodayUncut.length === 3? starsTodayUncut[1].trim(): '';

            repository.title = $elem.find('.repo-list-name a').attr('href');

            // Remove the first slash
            repository.title = repository.title.substring(1, repository.title.length);
            repository.owner = $elem.find('span.prefix').text();
            repository.description = $elem.find('p.repo-list-description').text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            repository.url = 'https://github.com/' + repository.owner + '/' + repository.title.split('/')[1];
            repository.language = language.length === 3 ? language[0].trim() : '';
            repository.starsToday = starsToday.split(/\s+/)[0];
            repository.totalStars = getStars(repository.url);
            console.log('received total stars '+repository.totalStars);

            repos.push(repository);
        });
        }
    })
})

function getStars(url)
{
    console.log('url being sent '+url);
    var totalStars;
    request(url, function(error, response, html)
     {
        console.log('response  error '+response, +error);
        if(!error)
        {
            var $ = cheerio.load(html);
            var $repo = $(this);
            totalStars = $repo.find('social-count js-social-count a').text();
            console.log('total stars '+totalStars);
        }
    });

    return totalStars;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
  console.log('Listening on ' + port);
});

module.exports = app;
