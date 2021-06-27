const express = require('express');
const PORT = process.env.PORT || 3004;
//node fetch pacakge
const fetch = require('node-fetch');
const app = express();

//delete thos route after, was useful just to set up server
/*app.get("/api", (req, res) => {

  res.json({ message: "Hello from ddserver!" });
});

*/

app.get("/api/:country?", async (req, res) => {
  //getting the country
  const {country} = req.params;
  console.log(country)


  try {

    const apiResponse = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    const apiResponseJson = await apiResponse.json();
    res.send(apiResponseJson)

  } catch(err) {
    console.log(err + 'this is the erro')
    res.status(500).send('Something went wrong')
  }

})

//get list of countries from front end

app.post("/api/:countries", async (req, res) => {

  //console.log(typeof req.params.countries + ' ' +   'parasm from :countries yeee')
  const params = req.params.countries;
console.log(typeof params, 'the params ')

  try {
    const endPoint = "https://restcountries.eu/rest/v2/alpha?codes=";
    const response = await fetch(endpoint)
    const parseResponse = await response.json()
    res.send(parseResponse, 'parse response')


  }catch(err) {
    res.status(500).send('not fetching the whole countries')
  }
  //endpoint to make request
  //https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}

})


app.listen(PORT, () => {
  console.log('adssadasfasdfasdSADFASDFasdnodemo' + PORT)
})
