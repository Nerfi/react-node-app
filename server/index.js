const express = require('express');

const PORT = process.env.PORt || 3001;

const app = express();

app.listen(PORT, () => {
  console.log('working this shit' + PORT)
})
