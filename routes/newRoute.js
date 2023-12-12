const express = require('express');
const router = express.Router();
const newsController = require('../controller/newController');

router.post('/news', newsController.addNews);
router.get('/news/search', newsController.searchNewsByTitle); 
router.get('/news', newsController.getAllNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
