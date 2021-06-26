import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [data, setData] = useState(null);
  const [country,setCountry] = useState('');

  useEffect(() => {

      const fetchBackEnd = async () => {

        fetch("/api")
         .then((res) => res.json())
         .then((data) => setData(data.message))
          .catch(e =>  console.log(e))
      }

      //caliing the function

      fetchBackEnd();

  },[]);

  //handling change on input value

  const handleChange = (e) => {

    const value = e.target.value;
    setCountry(value)

  }


  //submitting the data to backend

  const handleSubmit = (e) => {
    e.preventDefault();
    //url to post data to
    const url = `https://restcountries.eu/rest/v2/name/${country}`
    fetch("api/" + country)
      .then(res =>  res.json())
      .then(res =>  console.log(res))


    console.log(url);
  }



  return (
    <div className="App">
    <form onSubmit={handleSubmit}>
      <input type="text" value={country} onChange={ handleChange}/>
      <button type="submit">Search country</button>

    </form>

    </div>
  );
}

export default App;
