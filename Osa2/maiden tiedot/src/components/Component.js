import {useEffect } from 'react'
import countryService from "../services/countries"

const Find = ({HandleFindChange, findValue}) => {
    return (
      <p> find countries <input value={findValue} onChange={HandleFindChange} /> </p>
    )
  }
  
  const ShowCountries = ({findValue, countries, clickHandler, weather, setWeather }) => {
    let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(findValue.toLowerCase()))
    filteredCountries.sort((a,b) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase())) //check which fulfil criteria and sort them alphabetically
    if (filteredCountries.length > 10) {
      return (
          <p> Too many matches, specify another filter </p>
        )
      }
    else if (filteredCountries.length < 10 && filteredCountries.length > 1){
      return (
        <div>
           {filteredCountries.map(country =><p key={country.name.official}> {country.name.common} <button onClick={() => {clickHandler(country)}}>show</button> </p> )} 
        </div>
      )
    }
    else if (filteredCountries.length === 1){
        return (
          <ShowCountry country={filteredCountries[0]} weather={weather} setWeather={setWeather}/>
        )
    }
  }
  
  const ShowCountry = ({country, weather, setWeather}) => {
    useEffect(() => {
      if (country) {
          countryService.getWeather({lat: country.capitalInfo.latlng[0], long: country.capitalInfo.latlng[1]}).then(initialWeather => {
              setWeather(initialWeather)
          });
      }
  }, [country]);
      if (country && weather) {
        return (
          <div> 
            <h2> {country.name.common} </h2>
            <b> capital </b> {country.capital} <br />
            <b> area </b> {country.area} square kilometres <br />
            <b> languages: </b>
            <ul> {Object.entries(country.languages).map(([abb, name]) => <li key={abb}> {name}</li>)} </ul>
            <img src={country.flags.png} width="300" height="200" />
            <h2> Weather in {country.capital} </h2>
            <p> temperature {weather.current_weather.temperature} celsius</p>
            <p> wind {weather.current_weather.windspeed} m/s </p>
          </div>
        )
        }
    }

export {Find, ShowCountries, ShowCountry}