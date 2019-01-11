const models = require('./../models');
const db = require('mongoose');
const News = db.model('News');
const request = require('request');

const URL_exch_curr = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

module.exports = {
    getAllNews: async (req, res) => {
        try {
            const foundDoc = await News.find({}, {}, {limit: 3, sort: {date: -1}}, (err, doc) => doc)
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
            if (foundDoc.length > 0) return res.status(400).send('Description should be unique!')
        } catch (e) {
            return res.send(e.message)
        }

        try {
            const foundDoc = await News.find({ fullDescription: req.body.fullDescription }, (err, doc) => doc)
            if (foundDoc.length > 0) return res.status(400).send('Full description should be unique!')
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
        if (!id) return res.status(400).send('Id is required!')
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
        if (!id) return res.status(400).send('Id is required!');

        try {
            return await News.findOneAndRemove({ _id: id }, (err, doc) => {
                if (err) return res.send(err.message)
                if (doc) return res.send('Successfully deleted!');
            })
        } catch (e) {
            return res.send(e.message)
        }
    },
    getCurrency: async (req, res) => {
        try {
            await request(URL_exch_curr, (err, response, body) => {
                if(body) return res.send(JSON.parse(body));
            });

        } catch (e) {
            return res.send(e.message);
        }
    },
    getNewsByCategory: async (req, res) => {
        try {
            const foundDoc = await News.find({category: req.params.category}, (err, doc) => doc)
            if(foundDoc.length == 0) return res.status(400).send('News by category not found!');
            if(foundDoc) return res.send(foundDoc);
        } catch (e) {
            return res.send(e.message)
        }
    },
    getNewsByPage: async (req, res) => {
        const page = parseInt(req.params.page);
        if(page === 0) return res.status(400).send('Invalid page number, should start with 1!');
        try {
            const reqPage = await News.find({}, {}, {limit: 3, skip: 3*(page-1)}, (err, doc) => doc)
            if(reqPage.length == 0) return res.status(400).send('Invalid page number!');
            if(reqPage) return res.send(reqPage);
        } catch (e) {
            return res.send(e.message)
        }
    }
}