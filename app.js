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

const payment = require('./routes/payment.js');
app.use('/payment', payment);

const appointment = require('./routes/appointment.js');
app.use('/appointment', appointment);

const haircare = require('./routes/haircare.js');
app.use('/haircare', haircare);

const nailpedicare = require('./routes/nailpedicare.js');
app.use('/nailpedicare', nailpedicare);

const dress = require('./routes/dress.js');
app.use('/dress', dress);

const product = require('./routes/product.js');
app.use('/product', product);

const package = require('./routes/package.js');
app.use('/package', package);

const leave = require('./routes/leaves.js');
app.use('/leave', leave);

const employee = require('./routes/employee.js');
app.use('/employee', employee);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});