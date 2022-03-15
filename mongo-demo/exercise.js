const mongodb = require("mongoose");

mongodb.connect("mongodb://localhost/node-exercices")
        .then(() => console.log("Connected to MongoDB ... "))
        .catch(err => console.log("An error occurred", err))


const bookSchema = new mongodb.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date: { type: Date, default: Date.now }
});

const Book = mongodb.model("Book", bookSchema);

async function createBook(newBook) {
    console.log(" ::::::::::::  Using Comparision Operators :::::::::::: ")
    let book = new Book(newBook);
    const result = await book.save();
    console.log(result)
    console.log(" ::::::::::::  :::::::::::: :::::::::::::: :::::::::::: ")
}

// Add a book
// createBook({
//     name: "A Supper In Sweet Grove",
//     author: "Melissa Storm",
//     tags: ["Christian Fiction"],
//     isPublished: true,
//     price: 10
// });

// EXERCISE 1
async function getPublished() {
    console.log(" ::::::::::::  :::::::::::: :::::::::::: :::::::::::: ")
    let books = await Book
                            .find({isPublished: true})
                            .sort("-name")
                            .select({name: 1, author: 1})
    console.log(books);
    console.log(" ::::::::::::  :::::::::::: :::::::::::::: :::::::::: ")
}

// EXERCISE 2
async function getPublished2() {
    console.log(" ::::::::::::  :::::::::::: :::::::::::: :::::::::::: ")
    let books = await Book
                            .find({isPublished: true, tags: {$in: ["Thriller", "Crime"]}})
                            .sort("-price")
                            .select("name author price");
    console.log(books)
    console.log(" ::::::::::::  :::::::::::: :::::::::::: :::::::::::: ")
}

// EXERCISE 3
async function getPublished3() {
    console.log(" ::::::::::::  :::::::::::: :::::::::::: :::::::::::: ")
    let books = await Book.find({isPublished: true, price: {$gte: 15}}).or({name: /.*in.*/i})
    console.log(books)
    console.log(" ::::::::::::  :::::::::::: :::::::::::: :::::::::::: ")
}

// getPublished();
// getPublished2();
getPublished3();