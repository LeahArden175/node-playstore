/* eslint-disable strict */
const playdata = require('./playstore.js');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.listen(8000, () => {
  console.log('Server started on 8000');
});

app.get('/apps', (req, res) => {
   
  const { genre = " ", sort } = req.query;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Apps can only only be sorted by rating or app')
    }
  }

  if (genre) {
    if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card']
      .includes(genre)) {
      return res
        .status(400)
        .send('App genre must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, or Card.')
    }
  }

  if (sort === 'rating' || sort === 'app') {
        sorting = sort.charAt(0).toUpperCase() + sort.slice(1);
        playdata.sort((a,b) => {
            return a[sorting] > b[sorting] ? 1: a[sorting]< b[sorting] ? -1: 0;
        })
    }

  
    let results = playdata
    .filter(app => 
      app
        .Genres
        .toLowerCase()
        .includes(genre.toLowerCase())
    )

  res.json(results);

});