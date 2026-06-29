// import { useState, useEffect } from "react"
// import axios from 'axios'

// const App = () => {

//   const [searchQuery, setSearchQuery] = useState('')
//   const [allCountries, setAllCountries] = useState([])


//   useEffect (() => {
//      axios
//      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
//      .then(response => {
//       setAllCountries(response.data)
//       console.log(`Data loaded successfully` , response.data)
//      } )
//   }, [])

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value)
//   }

//   const countriesToShow = allCountries.filter(country => 
//     country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   let renderContent = null
//   if (countriesToShow.length > 10) {
//     renderContent = <p>Too many matches, specify another filter</p>
//   } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
//     renderContent = <ul>
//       {countriesToShow.map(country => 
//         <li key={country.name.common}>{country.name.common}</li>
//       )}
//     </ul>
//   } else if (countriesToShow.length === 1) {
//     const country = countriesToShow[0]
//     renderContent = <div>
//       <h1>{country.name.common}</h1>
//       <p>capital {country.capital[0]}</p>
//       <p>area {country.area}</p>
//       <h1>Languages :</h1> 
//       <ul>
//       {Object.values(country.languages).map (lang => 
//         <li key={lang}>{lang}</li>
//       )}
//       </ul>
//       <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
//     </div>
//   }


//   return (
//     <div>
//         <h1>Countries App</h1>
//         find Countries <input value={searchQuery} onChange={handleSearchChange} />
//         {renderContent}
//     </div>
//   )
// }

// export default App







import { useState, useEffect } from 'react'
import personService from './services/persons' // 👈 ਤੇਰੀ persons.jsx ਫਾਈਲ

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('ਡਾਟਾ ਲਿਆਉਣ ਵਿੱਚ ਗਲਤੀ ਹੋਈ:', error)
      })
  }, [])

      const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        // ਇੱਥੇ ਪੱਕਾ alert ਆਉਣਾ ਚਾਹੀਦਾ ਹੈ
        const msg = error.response?.data?.error || 'Unknown Error'
        alert(msg) 
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h3>Numbers</h3>
      <ul>
        {persons.map(person => 
          <li key={person.id}>{person.name} - {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App