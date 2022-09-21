const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class Genre extends Model{}
Genre.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
}, {
    sequelize,
    modelName: 'genre'
});

module.exports = Genre;