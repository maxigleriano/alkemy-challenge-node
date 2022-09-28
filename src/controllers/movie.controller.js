const { Op } = require("sequelize");
const Movie = require('../models/movie.model');
const Character = require('../models/character.model');
const Genre = require('../models/genre.model');

const create = (req, res) => {
    Movie.create({
            title: req.body.title,
            image: req.body.image,
            release_date: req.body.release_date,
            score: req.body.score
    }).then( (movie) => {
        res.status(201).json({ 'msg': 'Pelicula creada correctamente.', movie });
    }).catch( (err) => {
        res.status(500).json(err);
    });
};

const getAll = (req, res) => {
    const { name, genre, order } = req.query;
    const queryObject = {};
    let orderQuery;

    if(name) queryObject.title = { [Op.substring]: name };
    if(order == 'ASC') {
        orderQuery = ['release_date', order];
    } else if(order == 'DESC') {
        orderQuery = ['release_date', order];
    } else {
        orderQuery = ['createdAt', 'DESC'];
    }

    // TODO buscar por genero

    Movie.findAll({
        where: queryObject,
        attributes: [ 'id', 'title', 'image', 'release_date' ],
        order: [orderQuery]
    }).then( (movies) => {
        if(movies.length > 0) {
            res.status(200).json(movies);
        } else {
            res.status(404).json({ 'msg': 'No hay peliculas para mostrar' });
        }
    }).catch( (err) => {
        res.json(err);
    });
};

const getById = (req, res) => {
    const id = req.params.id;

    Movie.findByPk(id, {
        include: [
            {
                model: Character,
                attributes: [ 'id', 'name' ],
                through: {
                    attributes: []
                }
            },
            {
                model: Genre,
                attributes: [ 'id', 'name' ],
                through: {
                    attributes: []
                }
        }]
    }).then( (movie) => {
        if(movie !== null) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ 'error': ` no hay peliculas con el id: ${id}`})
        }       
    }).catch( (err) => {
        res.json(err);
    });
};

const update = (req, res) => {
    const id = req.params.id;

    Movie.update({
        title: req.body.title,
        image: req.body.image,
        release_date: req.body.release_date,
        score: req.body.score
    }, {
        where: {
            id: id
        }
    }).then( () => {
        res.status(200).json({ 'msg': 'pelicula editada correctamente'});
    }).catch( (err) => {
        res.json(err);
    });
};

const destroy = (req, res) => {
    const id = req.params.id;

    Movie.destroy({
        where: {
            id: id
        }
    }).then( () => {
        res.status(200).json({ 'msg': 'pelicula eliminada correctamente'});
    }).catch( (err) => {
        res.json(err);
    });
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    destroy,
};