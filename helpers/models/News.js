const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        'default': Date.now,
        required: true
    },
    category: {
        type: Array,
        required: true
    }
});


module.exports = mongoose.model('News', NewsSchema)