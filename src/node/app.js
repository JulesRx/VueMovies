var express = require('express');
var path = require('path');
var parser = require('body-parser');

var port = process.env.PORT || 8080;

global.MOVIES = [
  {
    id: 1549289040,
    title: 'The Truman Show',
    year: 1998,
    director: {
      name: 'Peter Weir',
      nationality: 'Australian',
      birthdate: '1944-08-21'
    },
    poster: null,
    genre: 'Drama'
  },
  {
    id: 1549289100,
    title: 'Batman v Superman: Dawn of Justice',
    year: 2016,
    director: {
      name: 'Zack Snyder',
      nationality: 'American',
      birthdate: '1966-03-01'
    },
    poster: null,
    genre: 'Superhero',
  },
  {
    id: 1549289160,
    title: 'Annihilation',
    year: 2018,
    director: {
      name: 'Alex Garland',
      nationality: 'English',
      birthdate: '1970-05-26'
    },
    poster: null,
    genre: 'Science Fiction'
  }
]

var app = express();

app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Router Middleware
var api = require('./routes.js');
app.use('/api', api);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type');
  res.setHeader('Content-Type', 'application/json');

  next();
});

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve('src/dist/index.html'));
});

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
