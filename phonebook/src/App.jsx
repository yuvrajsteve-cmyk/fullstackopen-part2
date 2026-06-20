import personService from './Services/Persons'
import { useEffect, useState } from 'react'

// 1. ਨੋਟੀਫਿਕੇਸ਼ਨ ਦਿਖਾਉਣ ਲਈ ਇੱਕ ਛੋਟਾ ਜਿਹਾ ਸਟਾਈਲਿਸ਼ ਕੰਪੋਨੈਂਟ (Inline CSS ਨਾਲ)
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('') // 👈 ਫਿਲਟਰ ਦੀ ਸਟੇਟ
  const [notification, setNotification] = useState(null) // 👈 ਨੋਟੀਫਿਕੇਸ਼ਨ ਦੀ ਸਟੇਟ

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      }) 
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterQuery(event.target.value) // 👈 ਫਿਲਟਰ ਚੇਂਜ ਹੈਂਡਲਰ

  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name?.toLowerCase() === newName.toLowerCase())
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            
            // 👈 ਨੰਬਰ ਬਦਲਣ 'ਤੇ ਨੋਟੀਫਿਕੇਸ਼ਨ ਸੈੱਟ ਕਰੋ
            setNotification(`Updated number for ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000) // 5 ਸੈਕਿੰਡ ਬਾਅਦ ਗਾਇਬ ਹੋ ਜਾਵੇਗਾ
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) 
        setNewName('')
        setNewNumber('')

        // 👈 ਨਵਾਂ ਬੰਦਾ ਐਡ ਹੋਣ 'ਤੇ ਨੋਟੀਫਿਕੇਸ਼ਨ ਸੈੱਟ ਕਰੋ
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000) // 5 ਸੈਕਿੰਡ ਬਾਅਦ ਗਾਇਬ ਹੋ ਜਾਵੇਗਾ
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`This person was already deleted from the server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  // 👈 ਲਿਸਟ ਨੂੰ ਫਿਲਟਰ (Search) ਕਰਨ ਦਾ ਲੌਜਿਕ
  const personsToShow = filterQuery === ''
    ? persons
    : persons.filter(person => person.name?.toLowerCase().includes(filterQuery.toLowerCase()))

  return (
    <div>
      <h1>PhoneBook</h1>
      
      {/* 👈 ਨੋਟੀਫਿਕੇਸ਼ਨ ਬਾਕਸ ਇੱਥੇ ਰੈਂਡਰ ਹੋਵੇਗਾ */}
      <Notification message={notification} />

      {/* 👈 ਤੁਹਾਡਾ ਮੰਗਿਆ ਹੋਇਆ ਫਿਲਟਰ ਬਾਕਸ (filter shown with :) */}
      <div>
        filter shown with : <input value={filterQuery} onChange={handleFilterChange} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <button type="submit">add person</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {/* 👈 ਹੁਣ ਅਸੀਂ persons ਦੀ ਜਗ੍ਹਾ personsToShow ਨੂੰ ਮੈਪ ਕਰ ਰਹੇ ਹਾਂ */}
        {personsToShow.map(person => 
          <li key={person.id}>
            {person.name} {person.number} {' '}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App