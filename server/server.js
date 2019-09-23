const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const items = require('./routes/itemRoute');
const users = require('./routes/userRoute');
const passport = require('passport');
require('dotenv').config();

const {authenticate} = require('./services/passport');
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

authenticate(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/items', items);
app.use('/api/users', users);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
