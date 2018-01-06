const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());


app.set('view engine', 'hbs');

//use middleware
//middleware is executed in order of declaration


//use custom middleware
//middleware intercepts all requests, call next to pass it on
app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        res.render('maintenance');
    });
    next();
});

//__dirname stores name of current dir
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //response.send('<h3>Hello world from express</h3>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my first express web app!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Uh oh something went wrong'
    });
});

//second arg is callback for server started
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));