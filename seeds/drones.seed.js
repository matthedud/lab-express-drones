// Iteration #1
require('dotenv/config');
const mongoose = require('mongoose');
const DroneModel = require('../models/Drone.model')

const MONGO_URI = "mongodb+srv://matthedud:FSBN5YY7U4DUv1qh@cluster0.yyotl.mongodb.net/LabDrone?retryWrites=true&w=majority"

const drones = [
    {
        name: "Super Drone",
        propellers : 4,
        maxSpeed : 20,
      },
      {
        name: "Hyper Drone",
        propellers : 1,
        maxSpeed : 15,
      },
      {
        name: "Mega Drone",
        propellers : 100,
        maxSpeed : 2,
      },
]

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    DroneModel.create(drones).then(()=>mongoose.connection.close()
    )
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
