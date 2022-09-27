const { Op } = require("sequelize");
const Movie = require('../models/movie.model');

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
    if(genre) queryObject.genre = { [Op.eq]: genre};
    if(order == 'ASC') {
        orderQuery = order;
    } else {
        orderQuery = 'DESC';
    }

    console.log(orderQuery);

    Movie.findAll({
        where: queryObject,
        attributes: [ 'id', 'title', 'image', 'release_date' ],
        order: [['release_date', orderQuery]]
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

    Movie.findByPk(id).then( (movie) => {
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