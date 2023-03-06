const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['normal', 'admin'], default: 'normal' },
    readBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    currentlyReading: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    wantToRead: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    ratings: [{ book: { type: Schema.Types.ObjectId, ref: 'Book' }, rating: Number }],
    reviews: [{ book: { type: Schema.Types.ObjectId, ref: 'Book' }, review: String }]
});

module.exports = mongoose.model('User', UserSchema);
