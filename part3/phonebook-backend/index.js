const express = require('express')

const app = express()
app.use(express.json())

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]

const url = '/api/persons'

app.get(url, (req, resp) => {
    resp.json(persons)
})

app.get(`${url}/:id`, (req, resp) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        resp.status(404).end()
    }
    else {
        resp.json(person)
    }
})

app.delete(`${url}/:id`, (req, resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    resp.status(204).end()
})

const getRandom = (start, end) => start + Math.floor((end - start ) * Math.random())

app.post(url, (req, resp) => {
    body = req.body

    if (!body.name || !body.number) {
        return resp.status(400).json({
            error: 'field missing',
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return resp.status(400).json({
            error: 'name already exists',
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandom(1, 1000000),
    }

    persons = persons.concat(person)

    resp.json(person)
})

app.get('/info', (req, resp) => {
    const nPersons = persons.length
    resp.send(`
    <div>Phonebook as info for ${nPersons}</div>
    <div>${Date()}</div>
    `)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
