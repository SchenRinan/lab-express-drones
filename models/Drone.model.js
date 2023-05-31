// Iteration #1
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const droneSchema = new Schema({
  // TODO: write the schema
    name: String,
    propellers: Number, 
    maxSpeed: Number,
});

const Drones = mongoose.model('Drones', droneSchema);

module.exports = Drones;