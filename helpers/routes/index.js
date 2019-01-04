const express = require('express');
const router = express.Router();
const editor = require('./../controller/editor');

module.exports = app => {
    router.get('/api/news/:news_id', editor.getNewsById);
    router.post('/api/news');
    router.patch('/api/news/:news_id');
    router.delete('/api/news/:news_id');
    app.use(router);
}