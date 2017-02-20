var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

var app = express();

// Configure app for bodyParser()
// lets us grap data from the body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up port for server to listen on
var port = process.env.PORT || 3000;

//Connect to DB
mongoose.connect('mongodb://localhost:27017/codealong');

// Api Pouters
var router = express.Router();

// Routers woll all be prefixed with / aai
app.use('/api', router);

// MIDDLEWARE -
// Middlewere can be very useful for doing validations. We can log
// things from here or stop the request form continuing in the event
// that the request is not safe.
// middleware to use for all request
router.use(function (req, res, next) {
  console.log('FYI... Thete is some processing currently going down...')
  next();
})

// Test Toute
app.use('/', function (req, res) {
  res.json({ message: 'Welcome to our Api'});
});

// Test Toute
router.route('/vehicles')
  .post(function (req, res) {
    var vehicle = new Vehicle(); // new instance of a vihacle
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function (err) {
      if(err) {
        res.send(err);
      }

      res.json({ message: 'Vehicle was succesfully manufactured'});
    })
  })
  .get(function (req, res) {
    Vehicle.find(function(err, vehicle) {
      if(err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/:vehicle_id')
  .get(function (req, res) {
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
      if(err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/make/:make')
  .get(function (req, res) {
    Vehicle.find({ make: req.params.make }, function(err, vehicle) {
      if(err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });


router.route('/vehicle/make/:color')
  .get(function (req, res) {
    Vehicle.find({ color: req.paramscolor }, function(err, vehicle) {
      if(err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });


// Fire up server
app.listen(port);

console.log('Server listenigto our por:' + port)
