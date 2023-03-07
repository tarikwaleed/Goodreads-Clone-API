
const Author = require('../models/author.model');

exports.author_create = (req, res, next) => {
    // Validate and sanitize fields.

    const author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        data_of_birth: req.body.data_of_birth,
        date_of_death: req.body.date_of_death,
        // coverImage: req.file.path,
    });

    author.save((err) => {
        if (err) {
            return next(err);
        }
        res.json(author);
    });
};

exports.author_details = (req, res, next) => {
    Author.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .populate('reviews')
        // .populate('ratings')
        .populate('averageRating')
        .populate('ratingCount')
        .exec((err, author) => {
            if (err) {
                return next(err);
            }
            if (author == null) {
                const err = new Error('Author not found');
                err.status = 404;
                return next(err);
            }
            res.render('author_detail', { title: book.title, book });
        });
};

exports.author_list = (req, res, next) => {
    Author.find()
        .populate('author')
        .populate('genre')
        .exec((err, author_list) => {
            if (err) {
                return next(err);
            }
            res.render('author_list', { title: 'Author List', book_list });
        });
};

exports.author_delete = (req, res, next) => {
    Author.findByIdAndRemove(req.body.authorid, (err) => {
        if (err) {
            return next(err);
        }
        // Success - go to author list.
        res.redirect('/catalog/authors');
    });
};


exports.author_update = function (req, res) {
    Author.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, author) {
        if (err) return next(err);
        res.send('Author updated.');
    });
};