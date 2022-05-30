const express = require('express');
const { animals } = require('./data/animals.json');
const app = express();

//route that front-end cant request data from. 
//(get() requires two arguments) first a string that describes the route
//the client will fetch from. 2nd is callback function that will execute
//when route is accesed with a GET request.
//using send() method from res(response) parameter, sends
//Hello to http://localhost:3001/api/animals
// app.get('/api/animals', (req, res) => {
    //     res.send('Hello');
    // });   

//filters requests, called back in GET 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

//to send json, change .send to .json
app.get('/api/animals', (req, res) => {
   let results = animals;
   if (req.query) {
       results = filterByQuery(req.query, results);
   }
   res.json(results);
});

//sets up server on a port (3001)
app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});