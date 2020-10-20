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
   
  const { genres, sort } = req.query;



  if (sort === 'rating' || sort === 'app') {
        sorting = sort.charAt(0).toUpperCase() + sort.slice(1);
        playdata.sort((a,b) => {
            return a[sorting] > b[sorting] ? 1: a[sorting]< b[sorting] ? -1: 0;
        })
    }

  
  let results = playdata
    .filter(appWord =>
      appWord
        .App);
        // .toLowerCase());
        // .includes(sort.toLowerCase()));

/*
  if (sort === 'app' || sort === 'genre') {
    results
      .sort((a, b) => {
        
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });

  } else { 
    results = "Error"  
  }
*/

  res.json(results);

  //   if(sort === 'rating' || sort === 'app') {





    
  //   }




});