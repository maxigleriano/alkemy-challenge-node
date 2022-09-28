const { Op } = require("sequelize");
const Character = require('../models/character.model');
const Movie = require("../models/movie.model");

const create = (req, res) => {
    Character.create({
            name: req.body.name,
            age: req.body.age,
            image: req.body.image,
            weight: req.body.weight,
            story: req.body.story
    }).then( (character) => {
        res.status(201).json({ 'msg': 'Personaje creada correctamente.', character });
    }).catch( (err) => {
        res.status(500).json(err);
    });
};

const getAll = (req, res) => {
    const { name, age, weight, movies } = req.query;
    const queryObject = {};

    if(name) queryObject.name = { [Op.substring]: name };
    if(age) queryObject.age = { [Op.eq]: age};
    if(weight) queryObject.weight = { [Op.eq]: weight };
    // TODO buscar por peliculas

    console.log(queryObject); 

    Character.findAll({
        where: queryObject,
        attributes: [ 'id', 'name', 'image' ]
    }).then( (characters) => {
        if(characters.length > 0) {
            res.status(200).json(characters);
        } else {
            res.status(404).json({ 'msg': 'No hay personajes para mostrar' });
        }
    }).catch( (err) => {
        res.status(500).json(err);
    });
};

const getById = (req, res) => {
    const id = req.params.id;

    Character.findByPk(id, {
        include: {
            model: Movie,
            attributes: [ 'id', 'title'],
            through: {
                attributes: []
            }
        }
    }).then( (character) => {
        if(character !== null) {
            res.status(200).json(character);
        } else {
            res.status(404).json({ 'error': ` no hay personajes con el id: ${id}`})
        }       
    }).catch( (err) => {
        res.status(500).json(err);
    });
};

const update = (req, res) => {
    const id = req.params.id;

    Character.update({
        name: req.body.name,
        age: req.body.age,
        image: req.body.image,
        weight: req.body.weight,
        story: req.body.story
    }, {
        where: {
            id: id
        }
    }).then( () => {
        res.status(200).json({ 'msg': 'personaje editado correctamente'});
    }).catch( (err) => {
        res.status(500).json(err);
    });
};

const destroy = (req, res) => {
    const id = req.params.id;

    Character.destroy({
        where: {
            id: id
        }
    }).then( () => {
        res.status(200).json({ 'msg': 'personaje eliminado correctamente'});
    }).catch( (err) => {
        res.status(500).json(err);
    });
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    destroy,
};