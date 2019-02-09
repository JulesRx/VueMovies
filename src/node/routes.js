var express = require('express');
var path = require('path');
var axios = require('axios');

var api = express.Router();

api.route('/movies').get((req, res, next) => {
  res.json(MOVIES);
});

api.route('/movie/:id').get((req, res, next) => {
  var movie = MOVIES.find(m => m.id == req.params.id);

  if (!movie)
    res.status(404).send({ error: 'Movie not found.' });
  else
    res.json(movie);
});

module.exports = api;
