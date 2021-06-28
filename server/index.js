const express = require('express');
const PORT = process.env.PORT || 3004;
//node fetch pacakge
const fetch = require('node-fetch');
const app = express();

//this endpoint will call all the countries
app.get("/api/all", async (req, res) => {
  //endpoint to make the call
  //THIS ENDPOINT IS WORKING
//  https://restcountries.eu/rest/v2/all

  try{

    const apiResponse = await fetch('https://restcountries.eu/rest/v2/all')
    const apiResponseJson =  await apiResponse.json();
    res.send(apiResponseJson)

  } catch(e) {
    res.status(500).send('Something went wrong with all the countries')
  }

  res.json({ message: "Hello from ddserver!" });
});



app.get("/api/:country", async (req, res) => {
  //getting the country typed by the user
  const {country} = req.params;


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

app.get("/api/countries/:codes", async (req, res) => {

  //endpoint to make request
  //https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}


  const params = req.params;
  //need to send params to the url, NOT DONE YET
  console.log( params.codes.split(' ').join(), 'the params send ')

  try {
    const response = await fetch("https://restcountries.eu/rest/v2/alpha?codes=col;no;ee")
    const parseResponse = await response.json();
    res.send(parseResponse)


  } catch(err) {
    res.status(500).send('not fetching the whole countries')
  }

})


app.listen(PORT, () => {
  console.log('nodemo' + PORT)
})
