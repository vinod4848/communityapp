const News = require('../models/newModel'); 

const newsController = {
  getAllNews: async (req, res) => {
    try {
      const news = await News.find();
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNewsById: async (req, res) => {
    try {
      const newsItem = await News.findById(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(200).json(newsItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addNews: async (req, res) => {
    try {
      const newNews = new News(req.body);
      const savedNews = await newNews.save();
      res.status(201).json(savedNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  searchNewsByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res.status(400).json({ message: 'Please provide a title parameter' });
      }

      const news = await News.find({ title: new RegExp(title, 'i') });

      if (news.length === 0) {
        return res.status(404).json({ message: 'No news found with the provided title' });
      }

      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateNews: async (req, res) => {
    try {
      const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedNews) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(200).json(updatedNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteNews: async (req, res) => {
    try {
      const deletedNews = await News.findByIdAndDelete(req.params.id);
      if (!deletedNews) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = newsController;
