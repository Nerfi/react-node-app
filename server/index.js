const express = require('express');
const PORT = process.env.PORT || 3004;
//node fetch pacakge
const fetch = require('node-fetch');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
//importing the user
const User = require('./models/User');
//importing validation function
const {
  registerValidation
  ,loginValidation
} = require('./validation/validation');
//hashing the password
const bcrypt = require('bcryptjs');
//jwt
const jwt = require('jsonwebtoken');



dotenv.config();
//connecting to DB, THIS NEED TO BE FINISH and pass the correct password
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }, () => console.log('connected to mongo'))

//middleware
app.use(express.json());



//this endpoint will call all the countries
app.get("/api/all", async (req, res) => {


  try{

    const apiResponse = await fetch('https://restcountries.eu/rest/v2/all')
    const apiResponseJson =  await apiResponse.json();
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
/*

app.post("/api/register", async (req, res) => {
  //destructuring the req object in order to get name, email, password
  const {email,name,password} = req.body;

  console.log(email, name, password)
  //const {error} = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);


  //checking if the user is already in the DB
  const emailExist =  await User.findOne({email: email});

  if(emailExist) return res.status(400).json('there was an errp') // not showing on front end

  //hash the password

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)


  const user = new User({
    name:  name,
    email: email,
    password: hashPassword
  })

  try {
    const savedUser = await user.save();
    res.send(savedUser);

  } catch(err) {
    //res.status(400).send(err + '' +  'there was an error ')
    //res.status(400).send('there was an error ') // not showing
    res.send('la cagaste loco ')

  }

})
*/



app.post("/api/register", async(req,res) => {

 const {email,name,password} = req.body;

 const {error} = await registerValidation(req.body)

    if (!error) {
        return res.status(400).json(error.details[0].message)
    }


  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.findOne({ email })
    if (user) {
        res.status(400).json({ error: 'user already exists ' })
    } else {
        const newUser = new User({name, email, password: hashPassword})
        const saveUser = await newUser.save()
        if (saveUser) {
            res.status(200).json(saveUser)
        } else {
            res.status(400).json({
                error: 'failed to save the user'
            })
        }
    }

})


//login
app.post("/api/login", async (req, res) => {

  const {email, password} = req.body;
  const {error} = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exist
  const userExist =  await User.findOne({email: email});
  if(!userExist) return res.status(400).send('Email  is wrong');
  //check if password is correct
  const validPassword = await bcrypt.compare(password, userExist.password)
  if(!validPassword) return res.status(400).send('Invalid password')
    //create an assign a token in order to keep the user in session
  const token = jwt.sign({_id: userExist._id},process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token)

 // res.send('success login ')

});




app.listen(PORT, () => {
  console.log('nodemo' + PORT)
})
