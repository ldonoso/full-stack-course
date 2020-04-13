import React from 'react'

const Person = ({person}) => 
    <li>{`${person.name} - ${person.number}`}</li>

const Persons = ({persons, filter}) => {
    const personsToShow =
        persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        < ul >
        {
            personsToShow.map(p => <Person key={p.id} person={p} />)
        }
      </ul >
    )
}

export default Persons