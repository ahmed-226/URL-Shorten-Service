const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
const {connect}= require('./config/db');
const apiRouter = require('./routes/url.routes');
connect();

app.get('/', function(req, res) {
  res.send('Hello World!');
});


app.use('/api', apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
    }
);
