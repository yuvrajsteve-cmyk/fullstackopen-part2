import { useState } from "react"




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNmber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

  const nameExist = persons.some(
    (person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    
  ) 
  if(nameExist) {
    alert(`${newName} is already added in the phonebook`)
    return
  } 

  const numberExist = persons.some (
    (person) => person.number === number
  )

  if (numberExist) {
    alert(`${number} is already exist in the phonebook`)
    return
  }

  
    const personObject = {
      name: newName,
      number: number,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNmber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNmber(event.target.value)
  }

  const handleNumberChange = (event) => setSearchTerm(event.target.value)

  const personsToShow = persons.filter( person =>
    person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )
  return (
    <div>
         <h2>Phonebook</h2>
         <div>
          filter shown with: <input value={searchTerm} onChange={handleNumberChange}/>
         </div>
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
          {personsToShow.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>
          )}
         </ul>
    </div>
  )
}

export default App