import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons([...persons, {name: newName, number: newNumber}]);
      setNewName(''); 
      setNewNumber(''); //add the person to the object and clear the values
    }
  }

  const HandleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const HandleFilterChange = (event) => {
    setFilterValue(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter HandleFilterChange={HandleFilterChange} filterValue={filterValue}/>
      <h3> Add a new</h3>
      <PersonForm newName={newName} HandleNameChange={HandleNameChange} addPerson={addPerson} newNumber={newNumber} HandleNumberChange={HandleNumberChange} />
      <h2>Numbers</h2>
      {persons.map(person => <Persons key={person.name} name={person.name} number={person.number} filterValue={filterValue} />)}
    </div>
  )

}

const Filter = (props) => {
  return (
    <p> filter shown with <input value={props.filterValue} onChange={props.HandleFilterChange} /> </p>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <p> name: <input value={props.newName} onChange={props.HandleNameChange} />  </p>  
      <p> number: <input value={props.newNumber} onChange={props.HandleNumberChange} /> </p>
    <div>
      <button type="submit">add</button>
    </div>
  </form> //add input boxes and call eventhandlers
  )
}

const Persons = (props) => {
  if (props.name.toLowerCase().includes(props.filterValue)){
    return (
      <p> {props.name} {props.number} </p>
    )
    } //if the user's name contains the filtered string, then show it
}

export default App