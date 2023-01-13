import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeather = ({lat, long}) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true`
  const request = axios.get(url)
  return request.then(response => response.data)
}

  
  export default { 
    getAll: getAll, 
    getWeather: getWeather
  }