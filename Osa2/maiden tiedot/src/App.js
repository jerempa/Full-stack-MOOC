import { useState, useEffect } from 'react'
import countryService from "./services/countries"
import {Find, ShowCountries, ShowCountry} from "./components/Component"

const App = () => {

  const [findValue, setFindValue] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  

  useEffect(() => {countryService.getAll().then(initialCountries => {
    setCountries(initialCountries)
  })
}, []) 

  const HandleFindChange = (event) => {
    setFindValue(event.target.value.toLowerCase());
    setCountry(null)
  }

  const clickHandler = (country) => {
    setCountry(country)
  }

  return (
    <div>
      <Find HandleFindChange={HandleFindChange} findValue={findValue}/>
      <ShowCountries findValue={findValue} countries={countries} clickHandler={clickHandler} weather={weather} setWeather={setWeather} />
      <ShowCountry country={country} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App;
