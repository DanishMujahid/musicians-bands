//const { DataTypes } = require('sequelize/types');
const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
const Band = sequelize.define('Band', {
    name: Sequelize.STRING,
    genre: Sequelize.STRING,
    bandMembers: Sequelize.INTEGER,
    showCount: Sequelize.INTEGER
    });

module.exports = {
    Band
};