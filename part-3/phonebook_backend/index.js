require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status  :res[content-length] - :response-time ms :body')
);

// middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

// get persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// get single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).send({
        error: 'Not found'
      });
    }
  });
});

// delete person
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).send({
          error: 'Already removed!'
        });
      }
    })
    .catch((error) => next(error));
});

// add person
app.post('/api/persons/', (request, response, next) => {
  const body = request.body;

  // const uniqueName = persons.some(
  //   (person) => person.name.toLowerCase() === body.name.toLowerCase()
  // );

  // if (!body.name) {
  //   return response.status(400).json({
  //     error: 'name is missing'
  //   });
  // }

  // if (!body.number) {
  //   return response.status(400).json({
  //     error: 'number is missing'
  //   });
  // }

  // if (uniqueName) {
  //   return response.status(400).json({
  //     error: 'name must be unique!'
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// update person
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;

  const person = {
    name,
    number
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then((result) => {
      response.json(result);
    })
    .catch((err) => next(err));
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'Malformated ID'
    });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({
      error: error.message
    });
  }

  next(error);
};

app.use(errorHandler);

//  server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
