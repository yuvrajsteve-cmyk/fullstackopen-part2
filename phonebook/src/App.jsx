import personService from './Services/Persons'
import { useEffect, useState } from 'react'

const Notification = ({ notification }) => {
  if (!notification || notification.message === null) {
    return null
  }
  const isError = notification.type === 'error'

  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('') 
  const [notification, setNotification] = useState({ message: null, type: 'success' }) 

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      }) 
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterQuery(event.target.value)

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
            
            setNotification({ message: `Updated number for ${returnedPerson.name}`, type: 'success' })
            setTimeout(() => {
              setNotification({ message: null, type: 'success' })
            }, 5000) 
          })
          .catch(error => {
            setNotification({
              message: `Information of ${newName} has already been removed from server`, 
              type: 'error'
            })
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setNewName('')
            setNewNumber('')
            setTimeout(() => setNotification({ message: null, type: 'success' }), 5000)
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

        // 🛠️ ਠੀਕ ਕੀਤਾ: ਇੱਥੇ ਹੁਣ String ਦੀ ਜਗ੍ਹਾ ਸਹੀ Object ਪਾਸ ਹੁੰਦਾ ਹੈ
        setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: 'success' })
        }, 5000) 
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

  const personsToShow = filterQuery === ''
    ? persons
    : persons.filter(person => person.name?.toLowerCase().includes(filterQuery.toLowerCase()))

  return (
    <div>
      <h1>PhoneBook</h1>
      
      {/* 🛠️ ਠੀਕ ਕੀਤਾ: ਇੱਥੇ message={notification} ਨੂੰ ਬਦਲ ਕੇ notification={notification} ਕਰ ਦਿੱਤਾ ਹੈ */}
      <Notification notification={notification} />

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