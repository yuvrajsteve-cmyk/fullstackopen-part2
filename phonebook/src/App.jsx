import { useState } from "react"




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])

  const [newName, setNewName] = useState('')
  const [number, setNmber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

  const nameExist = persons.some(
    (person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    
  ) 
  if(nameExist) {
    alert(`${newName} is already added in the phonebook`)
    return
  } 

  
    const personObject = {
      name: newName,
      number: number
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNmber(event.target.value)
  }
  return (
    <div>
         <h2>Phonebook</h2>
         <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={number} onChange={handleAddNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
         </form>
         <h2>numbers</h2>
         <ul>
          {persons.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>
          )}
         </ul>
    </div>
  )
}

export default App