import React from 'react'

const Person = ({name, phone}) => 
    <li key={name}>{`${name} - ${phone}`}</li>

const Persons = ({persons, filter}) => {
    const personsToShow =
        persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        < ul >
        {
            personsToShow.map(p => <Person name={p.name} phone={p.phone} />)
        }
      </ul >
    )
}

export default Persons