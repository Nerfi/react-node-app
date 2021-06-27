const express = require('express');

const PORT = process.env.PORT || 3004;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from ddserver!" });
});

app.get("/api/:country?", (req, res) => {
  //destructuring reque object
    const {country } = req.params;
    console.log(country, 'request from front end ')
})


app.listen(PORT, () => {
  console.log('adssadasfasdfasdSADFASDFasdnodemo' + PORT)
})
