const express = require('express');
const bodyParser = require('body-parser');

const register = require('./routes/register'); 
const auth = require('./routes/auth'); 

const app = express()
  .use(bodyParser.json())

let port = 10101

app.use('/register', register);
app.use('/auth', auth);


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});