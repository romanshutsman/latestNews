const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const importance = [1, 2, 3];
validateImportance = v => v == null || importance.includes(v)
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
        type: [String],
        required: true,
        validate: v => v == null || v.length > 0
    },
    edited: {
        type: Boolean,
        required: true
    },
    importance: {
        type: Number,
        required: true,
        validate: [validateImportance, 'Importance should be required or equal to 1, 2 or 3']
    }
});


module.exports = mongoose.model('News', NewsSchema)