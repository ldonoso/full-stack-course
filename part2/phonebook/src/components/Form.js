import React, { useState } from 'react'
import personService from '../services/persons'

const Form = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handlePhoneChange = (e) => setNewPhone(e.target.value)

  const addPerson = (e) => {
      e.preventDefault();

      const existingObject = persons.find(p => p.name === newName)
      if (existingObject) {
        if (!window.confirm('the name already exists. Overwrite?')) {
            return
        }

        const personObject = {
            ...existingObject,
            number: newPhone
        }

        personService
            .update(existingObject.id, personObject)
            .then((returnedObject) => {
                const newPersons = persons.map(p => p.id !== returnedObject.id ? p : personObject)
                setPersons(newPersons)
            })

      }
      else {
          const personObject = {
              name: newName,
              number: newPhone,
          }

          personService
              .create(personObject)
              .then(returnedPerson => {
                  const newPersons = persons.concat(returnedPerson)
                  setPersons(newPersons)
              })
      }

      setNewName('')
      setNewPhone('')
  }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>

            <div>
                phone: <input value={newPhone} onChange={handlePhoneChange} />
            </div>

            <div>
                <button type="submit">add</button>
            </div>

        </form>
    )
}

export default Form