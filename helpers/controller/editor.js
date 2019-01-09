const models = require('./../models');
const db = require('mongoose');
const News = db.model('News');

module.exports = {
    getAllNews: async (req, res) => {
        try {
            const foundDoc = await News.find({}, (err, doc) => doc)
            if (foundDoc) return res.send(foundDoc)
        } catch (e) {
            res.send(e.message);
        }
    },
    getNewsById: async (req, res) => {
        try {
            const foundDoc = await News.find({ _id: req.params.news_id }, (err, doc) => doc)
            if (foundDoc) return res.send(foundDoc)
        } catch (e) {
            res.send(e.message);
        }
    },
    createNews: async (req, res) => {
        try {
            const foundDoc = await News.find({ description: req.body.description }, (err, doc) => doc)
            if (foundDoc.length > 0) return res.send('Description should be unique!')
        } catch (e) {
            return res.send(e.message)
        }

        try {
            const foundDoc = await News.find({ fullDescription: req.body.fullDescription }, (err, doc) => doc)
            if (foundDoc.length > 0) return res.send('Full description should be unique!')
        } catch (e) {
            return res.send(e.message)
        }

        const newItem = req.body;
        newItem['edited'] = false;
        try {
            return await News.create(newItem, (err, doc) => {
                if (err) return res.send(err.message)
                if (doc) return res.send(doc);
            });
        } catch (e) {
            return res.send(e.message)
        }
    },
    editNews: async (req, res) => {
        const id = req.body._id;
        if (!id) return res.send('Id is required!')
        const updatedItem = req.body;
        updatedItem['edited'] = true;
        updatedItem['publishedAt'] = Date.now();

        try {
            return await News.findOneAndUpdate({ _id: id }, updatedItem, { new: true }, (err, doc) => {
                if (err) return res.send(err.message)
                if (doc) return res.send(doc);
            })
        } catch (e) {
            return res.send(e.message)
        }
    },
    deleteNews: async (req, res) => {
        const id = req.params.news_id;
        if(!id) return res.send('Id is required!');
        
        try {
            return await News.findOneAndRemove({ _id: id }, (err, doc) => {
                console.log(doc);
                if (err) return res.send(err.message)
                if (doc) return res.send('Successfully deleted!');
            })
        } catch (e) {
            return res.send(e.message)
        }
    }
}