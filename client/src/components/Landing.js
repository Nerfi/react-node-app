import React, {useState, useEffect} from 'react';



const LandingComponent = () => {

  const [country,setCountry] = useState('');
  const [error, setError] = useState(null);
  const [renderCountry, setRenderCountry] = useState({});
  //user input countries
  const [countries, setCountries] = useState('');
  //response from API
  const [retrieveCountries, setRetrieve] = useState([]);
  //search country by name
  const [countryQuery, setQuery] = useState('');
  //state to store the countries reteive by the user query
  const [countryQueryBack, setQueryBack] = useState([]);



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
}

//fethcing all the countries

const fetchAll = () => {
  fetch("/api/all")
  .then(res => res.json())
  .then(res => setQueryBack(res) )
  .catch(e => setError(e.message))
}

//calling the function in  a useEffect
useEffect(() => {
  fetchAll();
},[countryQuery])



//new function , needs to be refactor
const handleUserSeacrchQuery = (e) => {

    const keyword = e.target.value;

    if (keyword !== '') {
      const results = countryQueryBack.filter((country) => {
        return country.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });

      setQueryBack(results);
    } else {
      setQueryBack('') // check this after, not workign as expected
      // If the text field is empty, show all countires
    }

    setQuery(keyword);
  };


  return(
    <>
    <div className="App" style={{display: 'flex', justifyContent: 'center'}}>
    {error && error}
    <form onSubmit={handleSubmit}>
      <input type="text" value={country} onChange={handleChange} placeholder="search one or several countryies"/>
      <button type="submit">Search country</button>

    </form>

    <form onSubmit={handleSubmitCountries}>
    <input type="text" placeholder="countries" value={countries} onChange={(e) => setCountries(e.target.value)}/>
    <button type="submit">Search for countries</button>
    </form>



    </div>
    <div className="renderCountry" style={{display: 'flex', justifyContent: 'center', margin: '50px'}}>

      <li>{renderCountry[0]?.name}</li>
      <li>{renderCountry[0]?.capital}</li>
      <li>{renderCountry[0]?.languages[0].nativeName}</li>

    </div>

    <div className="searchCountry" style={{width: '300px', margin: 'auto'}}>

      <input
      type="text"
      placeholder="search a country"
      value={countryQuery}
      onChange={handleUserSeacrchQuery}
      />

       <div className="country-list">
        {countryQueryBack && countryQueryBack  ? (
          countryQueryBack.map((country, index) => (

            <li key={index + 1} className="country">
              <span className="country-id">{country.id}</span>
              <span className="country-name">{country.name}</span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>

    </div>

    </>
  )
};

export default LandingComponent;
