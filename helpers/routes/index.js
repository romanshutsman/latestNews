const express = require('express');
const router = express.Router();
const editor = require('./../controller/editor');

module.exports = app => {
    router.get('/api/news', editor.getAllNews);
    router.get('/api/news/:news_id', editor.getNewsById);
    router.post('/api/news', editor.createNews);
    router.patch('/api/news', editor.editNews);
    router.delete('/api/news/:news_id', editor.deleteNews);
    app.use(router);
}