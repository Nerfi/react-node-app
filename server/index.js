const express = require('express');
const PORT = process.env.PORT || 3004;
//node fetch pacakge
const fetch = require('node-fetch');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//importing the user
const User = require('./models/User');


dotenv.config();


//connecting to DB, THIS NEED TO BE FINISH and pass the correct password
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true }, () => console.log('connected to mongo'))


//settings
app.use(express.json());




//this endpoint will call all the countries
app.get("/api/all", async (req, res) => {


  try{

    const apiResponse = await fetch('https://restcountries.eu/rest/v2/all')
    const apiResponseJson =  await apiResponse.json()
    res.send(apiResponseJson)

  } catch(e) {
    res.status(500).send('Something went wrong with all the countries')
  }

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

//THIS METHOD NEED TO BE FINISHED
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

//creating routes sigin, signup, login, logout
//puede que tengamos que borrar algunos de estos get ya que no valen para nada creo

app.post("/api/register", async (req, res) => {

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const savedUser = await user.save();
    res.send(savedUser);

  } catch(err) {
    res.status(400).send(err + 'there was an error ')
  }

//  res.send({name, email, password} = user)
})





app.listen(PORT, () => {
  console.log('nodemo' + PORT)
})
