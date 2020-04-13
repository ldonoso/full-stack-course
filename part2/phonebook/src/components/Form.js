import React from 'react'

const Form = ({newName, setNewName, newPhone, setNewPhone, persons, setPersons}) => {
  const handleNameChange = (e) => setNewName(e.target.value)
  const handlePhoneChange = (e) => setNewPhone(e.target.value)

  const addPerson = (e) => {
      if (persons.find(p => p.name === newName)) {
        alert('the name already exists')
        return
      }

      const newPerson = {
          id: persons.length + 1,
          name: newName,
          phone: newPhone,
      }

      e.preventDefault();
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
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