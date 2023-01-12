import { useState, useEffect } from 'react'
import personService from "./services/persons"
import {Filter, PersonForm, Persons} from "./components/Component"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationType, setNotificationType]= useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {personService.getAll().then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) 

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (names.includes(newName)){
      const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmChange){
        const personid = persons.find(person => person.name === newName)
        personService.update(personid.id, {name: newName, number: newNumber}).then(newData => {
          let copy = [...persons]
          copy.splice(personid.id - 1, personid.id, newData)
          setPersons([...copy])
          setNewName(''); 
          setNewNumber('');
        }).catch(error => {
          setNotificationMessage(`Information of ${newName} has already been removed from server`)
          setNotificationType("error")
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 3500)
        })  
          setNotificationMessage(`Updated the number of ${newName}`)
          setNotificationType("info")
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 3500) //update the number of if the person has been removed from the server, inform the user
      }
    }
    else {
       personService.create({name: newName, number: newNumber}).then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName(''); 
        setNewNumber('');
        setNotificationMessage(`Added ${newName}`)
        setNotificationType("info")
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 3500)
      }) //add the person to the object and clear the values
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

  const HandleRemove = (props) => {
    const confirmRemove = window.confirm(`Delete ${props.name} ?`)
    if (confirmRemove) {
      personService.removeUser(props.id).then(response => {
        setPersons(persons.filter(person => person.name !== props.name))
      setNotificationMessage(`Removed ${props.name}`)
      setNotificationType("info")
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 3500)
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter HandleFilterChange={HandleFilterChange} filterValue={filterValue}/>
      <h3> Add a new</h3>
      <PersonForm newName={newName} HandleNameChange={HandleNameChange} addPerson={addPerson} newNumber={newNumber} HandleNumberChange={HandleNumberChange} />
      <h2>Numbers</h2>
      {persons.map(person => <Persons key={person.name} id={person.id} name={person.name} number={person.number} filterValue={filterValue} HandleRemove={HandleRemove} props={person}/>)}
    </div>
  )

}

export default App
