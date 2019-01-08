const models = require('./../models');
const client = require('./../../server');
const db = require('mongoose');
const NewsModel = db.model('News');
// const db = client.db('todo');
// const testModel = db.model('News');
module.exports = {
    getNewsById: async (req, res) => {
        console.log(req.params)
        try {
            await NewsModel.find({ _id: req.params.news_id }, (err, doc) => {
                if (doc) res.send(doc)
            })
        } catch (e) {
            res.send(e);
        }
    },
    createNews: async (req, res) => {
        if (!(req.body.category && req.body.title && req.body.description && req.body.fullDescription)) {
            return res.send('All keys is requrired!')
        }
        if(req.body.category.length == 0) return res.send('Category is requrired!')

        const newItem = req.body;
        newItem['publishedAt'] = Date.now();
        await NewsModel.create(newItem, (err, doc) => {
            if (err) throw err;
            res.send(doc);
        });
    }
}