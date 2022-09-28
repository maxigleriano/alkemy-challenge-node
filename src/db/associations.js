const Movie = require('../models/movie.model');
const Character = require('../models/character.model');
const Genre = require('../models/genre.model');

Movie.belongsToMany(Character, { through: 'movies_characters' });
Character.belongsToMany(Movie, { through: 'movies_characters' });

Movie.belongsToMany(Genre, { through: 'movies_genres' });
Genre.belongsToMany(Movie, { through: 'movies_genres' });