/**
 * Created by mad1 on 4/20/17.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/trucksAPI');

var Truck = require('./models/truckModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

trucksRouter = require('./Routes/truckRoutes')(Truck);



app.use('/api/trucks', trucksRouter);
//app.use('/api/companies', companiesRouter);


app.get('/', function (req, res) {
   res.send('welcome to my API!');

});

app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
});



