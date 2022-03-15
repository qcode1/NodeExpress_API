const res = require('express/lib/response');
const mongo = require('mongoose');

mongo.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB ... '))
    .catch(err => console.log('Could not connect to MongoDB ... ', err))

const movieSchema = new mongo.Schema({
    name: String,
    actors: [String],
    genre: [String],
    date: { type: Date, default: Date.now },
    profit: Number,
    isReleased: Boolean
});

const Movie = mongo.model('Movie', movieSchema);

async function createMovie(newMovie) {
    const movie = new Movie(newMovie);
    const newMovies = await movie.save();
    console.log(newMovies);
}

async function getMovies(status) {
    let result = await Movie
    .find({isReleased: status})                 // find using name field
    .sort({name: -1})                           // sort by name : ASC=1, DESC=-1
    .select({name: 1, actors: 1, genre: 1});    // select only name, actors, genre
    console.log(result);
}

async function getMovies() {
    let result = await Movie
    .findById()                             
    .sort({isReleased: 1})                           // sort by name : ASC=1, DESC=-1
    console.log(result);
}

// Comparison operators
// eq           = equal
// ne           = not equal
// gt / lt      = greater than / less than
// gte / lte    = greater than or equal to / less than or equal to
// in           = in
// nin          = not in 


// Logical operators
// OR
// AND

// Using Comparison operators
async function getMoviesComp(value) {
    let movies = await Movie
                            .find({profit: {$gte: value}})
                            .sort({name: 1})
    console.log(" ::::::::::::  Using Comparision Operators :::::::::::: ")
    console.log(movies)
    console.log(" ::::::::::::  :::::::::::: :::::::::::::: :::::::::::: ")
}

// Using logical operators
async function getMoviesLogic(){
    let movies = await Movie
    .find()
    .or({profit: {$gte: 20000000}}, {genre: {$in: ['Action', 'Thriller']}})
    console.log(" ::::::::::::  Using Logical Operators :::::::::::: ")
    console.log(movies)
    console.log(" ::::::::::::  :::::::::::: :::::::::::::: :::::::::::: ")

}

// Using regular expressions
async function getMoviesReg() {
let movies = await Movie
                        // .find({name: /^Aven/})           // starts with 'Aven...'
                        // .find({name: /light$/i})         // ends with '...light', i = case insensitive
                        .find({name: /.*N.*/i})              // contains ' n ', i = case insensitive
    console.log(" ::::::::::::  Using Regular Expression :::::::::::: ")

    console.log(movies);
    console.log(" ::::::::::::  :::::::::::: ::::::::::: :::::::::::: ")

}

// Using count function
async function getMoviesCount() {
    console.log(" ::::::::::::  Using Count Function :::::::::::: ")
    let movies = await Movie.find().count();
    console.log(movies);
    console.log(" ::::::::::::  ::::::::: ::::::::::: ::::::::::: ")
}

// Using pagination function
async function getMoviesPage() {
    const pageNumber = 2;
    const pageSize = 2;
    console.log(" ::::::::::::  Using Pagination Function :::::::::: ")
    let movies = await Movie
                            .find()
                            .skip((pageNumber -1) * pageSize)
                            .limit(pageSize);
    console.log(movies);
    console.log(" ::::::::::::  :::::::::::: ::::::::::: ::::::::::: ")
}

async function getAndUpdateMovie(id) {
    let movie = await Movie.findById(id);
    if (!movie) return ;
    // console.log("Movie not found")
    movie.isReleased = true;
    const result = await movie.save();
    console.log(result);
}

async function updateMovie() {
    let result = await Movie.updateMany({isReleased: false}, {isReleased: true});
    console.log(result)
}

async function deleteMovie() {
    let reult = await Movie.deleteOne()
    console.log(reult);
}

createMovie({
    name: "Venom : Let There Be Carnage",
    actors: ["Tom Hardy", "Stephen Graham Bateman", "J.K. Simmons"],
    genre: ["Sci-Fi", "Action"],
    profit: 12800000,
    isReleased: true
});

// getMovies();
// getMoviesComp(15000000.00);
// getMoviesLogic();
// getMoviesReg();
// getMoviesCount();
// getMoviesPage();

// getAndUpdateMovie("6227c51ae6990c7b70a1a367");
// updateMovie("6227c51ae6990c7b70a1a367");
// deleteMovie();

 







