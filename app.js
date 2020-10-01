const express = require('express');
const ThingController = require('./controllers/thing.controller');

const app = express();
app.use(express.json());

app.post('/thing', ThingController.createThing);
app.get('/things', ThingController.getAllThings);
app
  .route('/things/:thingId')
  .get(ThingController.getThingById)
  .put(ThingController.updateThingById, ThingController.createThing)
  .delete(ThingController.deleteThingById);

app.use((err, req, res, next) => {
  res.status(err?.status ?? 500).send({
    message: err?.message ?? err,
  });
});

module.exports = app;
