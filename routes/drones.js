const express = require('express');
const router = express.Router();

// require the Drone model here
const mongoose = require('mongoose');
const Drones = require('../models/Drone.model');
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-drones";

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  mongoose
  .connect(MONGO_URI)
  // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
  .then(()=> Drones.find({}))
  .then(result => res.render('drones/list', {result}))
  .then(()=> mongoose.connection.close())
  .catch((err) => {console.error("Error connecting to mongo: ", err);});
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  mongoose
  .connect(MONGO_URI)
  // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
  .then(()=> Drones.create(req.body))
  .then(res.render('drones/create-form', {success: 'a drone was successfully created'}))
  .then(()=> mongoose.connection.close())
  .catch((err) => {console.error("Error connecting to mongo: ", err);});
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here req.params.id is where the id would be
  mongoose
  .connect(MONGO_URI)
  // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
  .then(()=> Drones.findById(req.params.id))
  .then((droneSelected) => res.render('drones/update-form', {item: droneSelected}))
  .then(()=> mongoose.connection.close())
  .catch((err) => {console.error("Error connecting to mongo: ", err);});
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here req.params = id; req.body = components of requested update
  mongoose
  .connect(MONGO_URI)
  // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
  .then(()=> Drones.findByIdAndUpdate(req.params.id,{name: req.body.name, propellers: req.body.propellers, maxSpeed: req.body.maxSpeed}))
  .then(()=> Drones.findById(req.params.id))
  .then((droneSelected) => res.render('drones/update-form', {item: droneSelected, success: `drone updated`}))
  .then(()=> mongoose.connection.close())
  .catch((err) => {console.error("Error connecting to mongo: ", err);});
  // res.render('drones/update-form', {item:})
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  mongoose
  .connect(MONGO_URI)
  // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
  .then(()=> Drones.findByIdAndDelete(req.params.id))
  .then(Drones.find({}))
  .then(result => res.redirect('/drones'))
  .then(()=> mongoose.connection.close())
  .catch((err) => {console.error("Error connecting to mongo: ", err);});
});

module.exports = router;
