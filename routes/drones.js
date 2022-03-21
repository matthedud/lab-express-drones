const express = require('express');
const router = express.Router();
const DroneModel = require('../models/Drone.model')

// require the Drone model here

router.get('/drones', async (req, res, next) => {
  const drones = await DroneModel.find()
  res.render('drones/list', {drones})
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form')
});

router.post('/drones/create', async (req, res, next) => {
  const {name, propellers, maxSpeed} = req.body
  try{
    await DroneModel.create({name, propellers, maxSpeed})
    res.redirect('/drones')
  }
  catch{
    res.redirect('drones/create')
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  const {id} = req.params
  const drone = await DroneModel.findById(id)
  res.render('drones/update-form', {drone})
});

router.post('/drones/:id/edit', async(req, res, next) => {
  const {id} = req.params
  const {name, propellers, maxSpeed} = req.body
  try{
    await DroneModel.findByIdAndUpdate(id, {name, propellers, maxSpeed})
    res.redirect('/drones')
  }
  catch{
    res.redirect(`drones//drones/${id}/edit`)
  }
});

router.post('/drones/:id/delete',async(req, res, next) => {
  const {id} = req.params
  try{
    await DroneModel.findByIdAndDelete(id)
    res.redirect('/drones')
  }
  catch{
    res.redirect(`/drones`)
  }
});

module.exports = router;
