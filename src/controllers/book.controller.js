
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
    console.log(req.body);
    Book.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, book) {
        if (err) return next(err);
        res.send(req.body);
    });
};

exports.book_details = (req, res, next) => {
    Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .populate('reviews')
        // .populate('ratings')
        .populate('averageRating')
        .populate('ratingCount')
        .exec((err, book) => {
            if (err) {
                return next(err);
            }
            if (book == null) {
                const err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            res.render('book_detail', { title: book.title, book });
        });
};

exports.book_list = (req, res, next) => {
    Book.find()
        .populate('author')
        .populate('genre')
        .exec((err, book_list) => {
            if (err) {
                return next(err);
            }
            res.render('book_list', { title: 'Book List', book_list });
        });
};

exports.book_delete = (req, res, next) => {
    Book.findByIdAndRemove(req.body.bookid, (err) => {
        if (err) {
            return next(err);
        }
        // Success - go to book list.
        res.redirect('/catalog/books');
    });
};


