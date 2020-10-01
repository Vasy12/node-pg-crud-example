const { Thing } = require('./../models');

module.exports.createThing = async (req, res, next) => {
  const { body } = req;
  try {
    const thing = await Thing.create(body);
    if (thing) {
      return res.status(201).send({
        data: thing,
      });
    }
    res.status(400).send();
  } catch (err) {
    next(err);
  }
};

module.exports.getThingById = async (req, res, next) => {
  const {
    params: { thingId },
  } = req;
  try {
    const thing = await Thing.findByPk(thingId);
    if (thing) {
      return res.send({
        data: thing,
      });
    }
    res.status(404).send(`Thing with id ${thingId} not found`);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllThings = async (req, res, next) => {
  try {
    const things = await Thing.findAll();
    res.send({ data: things });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteThingById = async (req, res, next) => {
  const {
    params: { thingId },
  } = req;
  try {
    const thing = await Thing.deleteByPk(thingId);
    if (thing) {
      return res.status(200).send(thing);
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.updateThingById = async (req, res, next) => {
  const {
    body,
    params: { thingId },
  } = req;
  try {
    const thing = await Thing.findByPk(thingId);
    if (thing) {
      const updatedThing = await Thing.updateByPk(thingId, body);
      return res.send({
        data: updatedThing,
      });
    }
    return next();
  } catch (err) {
    next(err);
  }
};
