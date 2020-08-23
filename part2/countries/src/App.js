import React, { useState, useEffect } from 'react';
import axios from 'axios'

require('dotenv').config();

const Filter = (props) =>  {
  return (
    <input value={props.query} onChange={props.handleChange} />
  )
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({fetched: false})
  
  useEffect(()=> {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: city
    }

    axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      console.log({params})
      console.log(response)
      setWeather({
        fetched: true,
        temperature: response.data.current.temperature,
        windSpeed: response.data.current.wind_speed,
        windDirection: response.data.current.wind_dir,
        icon: response.data.current.weather_icons[0]
      })
    })
  }, [city])

  if (!weather.fetched) {
    return <div></div>
  }
  
  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <b>temperature:</b> {weather.temperature} Celcius
      </div>
      <img src={weather.icon} width='50px' alt='Weather icon'/>
      <div>
        <b>wind:</b> {weather.windSpeed} mph direction {weather.windDirection}
      </div>
    </div>
  )

}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((lang) =>
          <li key={lang.iso639_2}>{lang.name}</li>  
        )}
      </ul>
      <img src={country.flag} width='100px' alt={`Flag of ${country.name}`}/>

      <Weather city={country.capital} />
    </div>
  )
}

const Countries = ({ countries, setQuery }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map(c =>
        <div key={c.alpha3Code}>
          {c.name} 
          <button onClick={() => setQuery(c.name)}>
            show
          </button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleQueryChange = (event) => setQuery(event.target.value)

  const matchingCountries = countries.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries <Filter query={query} handleChange={handleQueryChange} />
      </div>
      {
        matchingCountries.length === 1
          ? <Country country={matchingCountries[0]} />
          : <Countries countries={matchingCountries} setQuery={setQuery} />
      }
    </div>
  )
}

export default App