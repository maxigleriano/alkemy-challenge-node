const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class Character extends Model {}
Character.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    story: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'character'
});

module.exports = Character;