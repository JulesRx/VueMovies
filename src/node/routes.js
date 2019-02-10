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

api.route('/movie/:id/delete').delete((req, res, next) => {
  var index = MOVIES.findIndex(m => m.id == req.params.id);

  if (index == -1) {
    res.status(404).send({ error: 'Movie not found.' });
  }
  else {
    MOVIES.splice(index, 1);
    res.status(204).send(null);
  }
})

module.exports = api;
