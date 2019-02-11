var express = require('express');
var multer = require('multer');
var mime = require('mime');
var path = require('path');
var axios = require('axios');

var api = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/dist/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, 'poster-' + Date.now() + '.' + mime.getExtension(file.mimetype));
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  }
});

api.route('/movies').get((req, res, next) => {
  res.json(MOVIES);
});

api.route('/movies').post(upload.single('poster'), (req, res) => {
  var newMovie = JSON.parse(req.body.movie);
  newMovie.id = MOVIES[MOVIES.length - 1].id + 1;
  newMovie.year = parseInt(newMovie.year);
  if (req.file) {
    newMovie.poster = 'uploads/' + req.file.filename;
  }

  MOVIES.push(newMovie);
  res.json(newMovie);
});

api.route('/movie/:id').get((req, res, next) => {
  var movie = MOVIES.find(m => m.id == req.params.id);

  if (!movie)
    res.status(404).send({ error: 'Movie not found.' });
  else
    res.json(movie);
});

api.route('/movie/:id').put(upload.single('poster'), (req, res, next) => {
  var movie = MOVIES.find(m => m.id == req.params.id);

  if (!movie) {
    res.status(404).send({ error: 'Movie not found' });
  } else {
    var uMovie = JSON.parse(req.body.movie);

    movie.title = uMovie.title;
    movie.year = parseInt(uMovie.year);
    movie.director.name = uMovie.director.name;
    movie.director.nationality = uMovie.director.nationality;
    movie.director.birthdate = uMovie.director.birthdate;
    movie.genre = uMovie.genre;

    if (req.file != undefined) {
      movie.poster = 'uploads/' + req.file.filename;
    }

    res.json(movie);
  }
});

api.route('/movie/:id/delete').delete((req, res, next) => {
  var index = MOVIES.findIndex(m => m.id == req.params.id);

  if (index == -1) {
    res.status(404).send({ error: 'Movie not found.' });
  }
  else {
    MOVIES.splice(index, 1);
    res.status(204).send(null);
  }
});

module.exports = api;
