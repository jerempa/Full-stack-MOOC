

const Filter = ({HandleFilterChange, filterValue}) => {
    return (
      <p> filter shown with <input value={filterValue} onChange={HandleFilterChange} /> </p>
    )
  }
  
  const PersonForm = ({newName, HandleNameChange, addPerson, newNumber, HandleNumberChange}) => {
    return (
      <form onSubmit={addPerson}>
        <p> name: <input value={newName} onChange={HandleNameChange} />  </p>  
        <p> number: <input value={newNumber} onChange={HandleNumberChange} /> </p>
      <div>
        <button type="submit">add</button>
      </div>
    </form> //add input boxes and call eventhandlers
    )
  }
  
  const Persons = ({id, name, number, filterValue, HandleRemove, props}) => {
    if (name.toLowerCase().includes(filterValue)){
      return (
        <p> {name} {number} <button onClick={() => HandleRemove(props)} type="remove">delete</button> </p>
      )
      } //if the user's name contains the filtered string, then show it
  }

export {Filter, PersonForm, Persons}