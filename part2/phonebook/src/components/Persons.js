import React from 'react'
import personService from '../services/persons'

const Person = ({person, handleClick}) => 
    <li>
        {`${person.name} - ${person.number}`}
        <button onClick={handleClick}>delete</button>
    </li>

const Persons = ({persons, setPersons, filter}) => {
    const personsToShow =
        persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    const handleClickOf = (id) => {
        if (!window.confirm('Are you sure?')) {
            return
        }

        personService.deleteObject(id).then(response => {
            if (response.status === 200) {
                setPersons(persons.filter(p => p.id !== id))
            }
        });
    }

    return (
        < ul >
        {
                personsToShow.map(p =>
                    <Person
                        key={p.id}
                        person={p}
                        handleClick={() => handleClickOf(p.id)}
                    />
                )
        }
      </ul >
    )
}

export default Persons