const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//import the routes

const csvRouter = require('./routes/csvs');
const usersRouter = require('./routes/users');

// where the uri is stored for security purposes

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// this is the static route for serving files

app.use('/static', express.static('./csvs'));

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

// connect to mongodb database
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//apply all the imported routes
app.use('/csvs', csvRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
