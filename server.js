const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);


app.listen(app.get('port'));

app.get('/test', (request, response) => {
  return response.status(200).json({test: 'hello'});
});

app.post('/api/v1/garage', (request, response) => {
  const item = request.body;

  for (var reqParams of ['name', 'reason', 'cleanliness']) {
    if (!item[reqParams]) {
      return response.status(422).json({error: `You are missing the ${reqParams} field!`})
    }
  }

  return database('garage').insert(item, 'id')
    .then(id => {
      return response.status(201).json({status: 'Success', id: id[0]});
    })
    .catch(err => {
      return response.status(500).json({error: err});
    })
});

app.get('/api/v1/garage', (request, response) => {
  return database('garage').select()
    .then(items => {
      return response.status(200).json({items});
    })
    .catch(err => {
      return response.status(500).json({error: `Error fetching items: ${err}.`})
    })
});

app.patch('/api/v1/garage/:id', (request, response) => {
  const cleanliness = request.body;
  const { id } = request.params;

  if (!cleanliness.cleanliness) {
    return response.status(422).json({error: 'Enter a valid cleanliness'});
  }


  return database('garage').where('id', id).update(cleanliness)
    .then(() => {
      response.status(202).json({status: 'successfully updated cleanliness'});
    })
    .catch(error => {
      response.status(500).json({error: 'failed to update cleanliness'});
    });

})


module.exports = app;