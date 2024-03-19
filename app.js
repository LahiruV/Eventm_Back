const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection successfully");
});

const user = require('./routes/user.js');
app.use('/user', user);

const feedback = require('./routes/feedback.js');
app.use('/feedback', feedback);

const eventReq = require('./routes/eventReq.js');
app.use('/eventReq', eventReq);

const payment = require('./routes/payment.js');
app.use('/payment', payment);

const crew = require('./routes/crew.js');
app.use('/crew', crew);

const place = require('./routes/place.js');
app.use('/place', place);

const sponsor = require('./routes/sponsor.js');
app.use('/sponsor', sponsor);

const budget = require('./routes/budget.js');
app.use('/budget', budget);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});