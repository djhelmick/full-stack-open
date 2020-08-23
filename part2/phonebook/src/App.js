import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setSearchFilter(event.target.value)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const displayMessage = (message, isError) => {
    setMessage({text: message, isError})
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      const replacePerson = window.confirm(`
        ${newName} is already added to the phonebook, replace the old number with a new one?
      `)
      
      if (replacePerson) {
        const oldPerson = persons.find(p => p.name === newName)
        personsService
          .update(oldPerson.id, {...oldPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            
            setNewName('')
            setNewNumber('')
            displayMessage(`
              Information of ${updatedPerson.name} has been updated in the server
            `, false)
          })
      }
      return
    }
    
    personsService
      .create({ name: newName, number: newNumber })
      .then(newPerson => setPersons(persons.concat(newPerson)))

    displayMessage(`
      Information of ${newName} has been added to the server
    `, false)
    setNewName('')
    setNewNumber('')
  }

  const personsToDisplay = persons.filter((person) => 
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  )

  const removePersonWithId = (id) => {
    personsService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        const name = persons.find(p => p.id === id).name
        setPersons(persons.filter(p => p.id !== id))
        displayMessage(`
          Information of ${name} has already been removed from server
        `, true)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter value={searchFilter} handleChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      
      <Persons persons={personsToDisplay} removePerson={removePersonWithId} />
    </div>
  )
}

export default App