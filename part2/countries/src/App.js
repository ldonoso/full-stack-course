import React, {useState, useEffect} from 'react';
import axios from 'axios'

const getWeather = async ({latlng}) => {
  const [lat, lng] = latlng

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: `${lat},${lng}`,
  }
  console.log(process.env.KEY_WEATHER_STACK)

  return axios.get('http://api.weatherstack.com/current', { params })
    .then(response => {
      console.log(response)
      const weather = response.data;
      return weather;
    }).catch(error => {
      console.log(error);
    });
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState(undefined);

  useEffect(
    () => {
      getWeather(country).then(w => {
        console.log('weather got', w);
        setWeather(w)
      })
    },
    [country]
  )

  if (weather === undefined) {
    return (null)
  }

  const current = weather.current
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><b>temperature:</b> {current.temperature}</p>
      <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} />
      <p><b>wind:</b> {`${current.wind_speed} mph direction ${current.wind_dir}`}</p>
    </div>
  )
}

const Country = ({country}) => {
  if (country === undefined) {
      return (null)
  }

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <b>Languages</b>
      <ul>
        {country.languages.map(l =>
          <li key={l.iso639_1}>{l.name}</li>)}
      </ul>

      <img src={country.flag} alt={`Flag of ${country.name}`}/>

      <Weather country={country} />
    </>
  )
}

const Countries = ({countries}) => {
  const [country, setCountry] = useState(undefined)

  return (
    <>
      <ul>
        {countries.map(c =>
          <li key={c.name}>
            {c.name}
            <button onClick={() => setCountry(c)}>show</button>
          </li>
        )}
      </ul>

      <Country country={country} />
    </>
  )
}

const Display = ({countries}) => {
  const nCountries = countries.length

  if (nCountries > 10) {
    return (
      <div>Too many countries</div>
    )
  }
  else if (nCountries === 1) {
    return <Country country={countries[0]} />
  }
  else {
    return <Countries countries={countries} />
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(
    () => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(r => {
          setCountries(r.data)
        })
    },
    [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const countriesF = countries.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      Filter: 
      <input value={filter} onChange={handleFilterChange} />
      <Display countries={countriesF} />
    </div>
  );
}

export default App;
