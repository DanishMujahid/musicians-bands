const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
const Musician = sequelize.define("Musician", {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    instrument: DataTypes.STRING
})

module.exports = {
    Musician
};