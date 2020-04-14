import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(persons => {
          setPersons(persons)
        })
      }
    , [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />

      <h2>Add a new</h2>
      <Form persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App