const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config() // load before modules
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) {
  console.log(req.method)
  return JSON.stringify(req.body)
})

const handler = morgan(':method :url :status :res[content-length] - :response-time ms - :body')
app.use(handler)

const url = '/api/persons'

app.get(url, (req, resp, next) => {
  Person.find({}).then(persons => {
    resp.json(persons.map(p => p.toJSON()))
  })
    .catch(e => {
      next(e)
    })
})

app.get(`${url}/:id`, (req, resp, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        resp.status(404).end()
      }
      else {
        resp.json(person)
      }
    })
    .catch(e => {
      next(e)
    })
})

app.delete(`${url}/:id`, (req, resp) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      resp.status(204).end()
    })
})

app.put(`${url}/:id`, (req, resp, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(person2 => {
      resp.json(person2.toJSON())
    })
    .catch(e => next(e))
})

app.post(url, (req, resp, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return resp.status(400).json({
      error: 'field missing',
    })
  }

  // if (persons.find(p => p.name === body.name)) {
  //     return resp.status(400).json({
  //         error: 'name already exists',
  //     })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(person2 => {
    resp.json(person2.toJSON())
  })
    .catch(error => next(error))
})

app.get('/info', (req, resp, next) => {
  Person.find({})
    .then(persons => {
      const nPersons = persons.length
      resp.send(`
                <div>Phonebook as info for ${nPersons}</div>
                <div>${Date()}</div>
                `)
    })
    .catch(e => next(e))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else {
    return response.status(400).send({
      error: error.message
    })
  }
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
