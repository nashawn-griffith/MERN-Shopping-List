const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/itemRoute');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

//database
mongoose
  .connect(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Database running'))
  .catch(error => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/items', routes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
