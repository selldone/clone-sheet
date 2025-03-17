'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(__dirname, '../config/config.js'));  // Import config.js, not config.json
const db = {};

// Set the environment to use the right config (e.g., development, production, etc.)
const environment = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[environment];  // Use the environment's configuration

const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig);

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;  // Export models and sequelize instance
