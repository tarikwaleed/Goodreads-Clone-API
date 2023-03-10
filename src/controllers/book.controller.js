
const Book = require('../models/book.model');

exports.book_create = (req, res, next) => {
    // Validate and sanitize fields.


    const book = new Book({
        title: req.body.title,
        summary: req.body.summary,
        isbn: req.body.isbn,
        author: req.body.author,
        genre: req.body.genre,
        coverImage: req.file.path
    });

    book.save((err) => {
        if (err) {
            return next(err);
        }
        res.json(book);
    });
};
exports.book_update = function (req, res) {
    req.body.coverImage = req.file.path
    Book.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true },
        function (err, book) {
            if (err) return next(err);
            res.send(book);
        });
};
exports.book_delete = async (req, res, next) => {
    //? Callbacks Implementation
    // Book.findByIdAndRemove(req.body.id, (err) => {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.json("book deleted")
    // });
    //? async/await Implementation
    const id = req.params.id
    const filter = { _id: id }
    try {
        const deletedBook = await Book.findByIdAndDelete(filter)
        res.json(deletedBook)
    } catch (error) {
        next(`Outch! Couldn't delete the id ${id}`)

    }


};

exports.book_details = (req, res, next) => {
    Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        // .populate('reviews')
        // .populate('ratings')
        // .populate('averageRating')
        // .populate('ratingCount')
        .exec((err, book) => {
            if (err) {
                return next(err);
            }
            if (book == null) {
                const err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            res.json(book)
        });
};

exports.book_list = (req, res, next) => {
    Book.find()
        .populate('author')
        // .populate('genre')
        // .populate('reviews')
        // .populate('ratings')
        // .populate('read')
        // .populate('currentlyReading')
        // .populate('wantToRead')
        .exec((err, book_list) => {
            if (err) {
                return next(err);
            }
            res.json(book_list)
        });
};



