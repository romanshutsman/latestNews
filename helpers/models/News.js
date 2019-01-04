const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NewsSchema = new Schema({
    title: { type: String },
    description: { type: String },
    fullDescription: { type: String },
    publishedAt: { type: Date, 'default': Date.now },
    category: { type: Array},
    id: { type: ObjectId }
});


module.exports = mongoose.model('News', NewsSchema)