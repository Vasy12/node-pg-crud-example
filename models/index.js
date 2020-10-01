const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const configs = require('./../configs/db.json');

const env = process.env.NODE_ENV ?? 'development';

const config = configs[env];

const client = new Client(config);

const currentFileName = path.basename(__filename);

const db = {
  client,
};

fs.readdirSync(__dirname)
  .filter(f => /\.js$/.test(f) && f !== currentFileName)
  .forEach(f => {
    const Model = require(path.resolve(__dirname, f));
    Model.client = client;
    db[Model.name] = Model;
  });

client.connect();

process.on('beforeExit', () => {
  client.end();
});

module.exports = db;
