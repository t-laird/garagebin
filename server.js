const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const databae = require('knex')(config);


app.listen(app.get('port'));

app.get('/test', (request, response) => {
  return response.status(200).json({test: 'hello'});
});

app.post('/api/v1/garage', (request, response) => {
  const item = request.body;

  for (var reqParams of ['name', 'reason', 'cleanliness']) {
    if (!item[reqParams]) {
      return response.status(422).json({error: `You are missing the required parameter ${reqParams}.`})
    }
  }

  return database('garage').insert(item, 'name')
    .then(name => {
      return response.status(201).json({status: `Successfully added ${name} to your garage.`});
    })
    .catch(err => {
      return response.status(500).json({error: err});
    })
});