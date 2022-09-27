const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class Movie extends Model {}
Movie.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: DataTypes.STRING,
    release_date: DataTypes.DATE,
    score: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
}, {
    sequelize,
    modelName: 'movie'
});

module.exports = Movie;