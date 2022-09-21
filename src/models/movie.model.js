const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class Movie extends Model {}
Movie.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    release_date: DataTypes.DATE,
    score: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'movie'
});

module.exports = Movie;