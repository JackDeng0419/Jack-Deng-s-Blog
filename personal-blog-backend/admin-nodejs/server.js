const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8989;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // it can help us to parse the form data into an object
app.use(express.json());

// claim the middleware you want to use for parsing cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// claim the router middleware
const indexRouter = require('./routers');
app.use('/', indexRouter);

mongoose
  .connect('mongodb://localhost/personal_blog', { useNewUrlParser: true })
  .then(() => {
    console.log('Connect to the database successfully.');
    app.listen(PORT, function () {
      console.log('Server is running on PORT:', PORT);
    });
  })
  .catch((error) => {
    console.error('Fail to connect to the database', error);
  });
