import './App.css';
import {useState, useEffect} from 'react';

function App() {

  //this state must be delete afterwars
  const [data, setData] = useState(null);

  const [country,setCountry] = useState('');
  const [error, setError] = useState(null);
  const [renderCountry, setRenderCountry] = useState({});
  //handling multiples countryes
  const [countriesResponse, setCountriesResponse] = useState([]);
  //user input countries
  const [countries, setCountries] = useState('');
  //response from API
  const [retrieveCountries, setRetrieve] = useState([]);




  //handling change on input value
  const handleChange = (e) => {

    const value = e.target.value;
    setCountry(value)

  }


  //handling submmitn action
const handleSubmit = (e) => {
  //preventing default behavior
  e.preventDefault();


  fetch(`/api/${country}`)
    .then(res => res.json())
    .then(res => setRenderCountry(res))
    .catch(err => setError(err.message))

    //cleaning the state after submitting
    setCountry('');


}


///second call for several countries
//NNED TO DISPLAY THIS DATA IN THE UI
const handleSubmitCountries = (e) => {
  e.preventDefault();
  //fetching the countries
  fetch(`/api/countries/${countries}`)
    .then(res => res.json())
    .then(res => setRetrieve(res))
    .catch(e => setError(e.message))

    //cleaning the state
    setCountries('');
}  ///working as getting otput as expected
  console.log(retrieveCountries, 'countries from API call ')

  return (
    <div className="App">
    {error && error}
    <form onSubmit={handleSubmit}>
      <input type="text" value={country} onChange={handleChange} placeholder="search one or several countryies"/>
      <button type="submit">Search country</button>

    </form>

    <form onSubmit={handleSubmitCountries}>
    <input type="text" placeholder="countries" value={countries} onChange={(e) => setCountries(e.target.value)}/>
    <button type="submit">Search for countries</button>
    </form>


    <div className="renderCountry">

      <li>{renderCountry[0]?.name}</li>
      <li>{renderCountry[0]?.capital}</li>
      <li>{renderCountry[0]?.languages[0].nativeName}</li>

    </div>

    </div>
  );
}

export default App;

