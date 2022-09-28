const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class Genre extends Model{}
Genre.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: DataTypes.STRING
}, {
    sequelize,
    modelName: 'genre'
});

module.exports = Genre;