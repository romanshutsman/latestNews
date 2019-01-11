const express = require('express');
const router = express.Router();
const apiHandler = require('./../controller/apiHandler');

module.exports = app => {
    //API News
    router.get('/api/news', apiHandler.getAllNews);
    router.get('/api/news/:news_id', apiHandler.getNewsById);
    router.post('/api/news', apiHandler.createNews);
    router.patch('/api/news', apiHandler.editNews);
    router.delete('/api/news/:news_id', apiHandler.deleteNews);
    
    router.get('/api/news/category/:category', apiHandler.getNewsByCategory);
    router.get('/api/news/page/:page', apiHandler.getNewsByPage);

    router.get('/api/get-currency', apiHandler.getCurrency);
    app.use(router);
}