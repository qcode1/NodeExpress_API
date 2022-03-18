const mongodb = require("mongoose");

const movieSchema = new mongodb.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 200,
        uppercase: true,
    },
    actors: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0
            },
            message: "At lest one actor/actress should be provided"
        }
    },
    genre: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            }, 
            message: "At least one genre should be provided"
        }
    },
    isReleased: {
        type: Boolean,
        required: true
    },
    date: { type: Date, default: Date.now },
    profit: {
        type: Number,
        min: 100,
        required: function() {
            return this.isReleased;
        }
    }
});

const Movie = new mongodb.model('Movie', movieSchema);

async function createMovie(body) {
    let movie = new Movie(body);
    const result = await movie.save();
    console.log(" :::::::::: Storing new movie to DB ... ::::::::::")
    return result;
}

async function getMovies() {
    console.log(" :::::::::: Retrieving movies from DB ... ::::::::::")
    let movies = Movie.find().sort('name');
    return movies
}

async function getOneMovie(id) {
    console.log(" :::::::::: Retrieving movies from DB ... ::::::::::")
    let movie = Movie.find({_id: id});
    return movie;
}


module.exports = {createMovie, getMovies, getOneMovie, Movie}