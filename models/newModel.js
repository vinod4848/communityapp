const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
