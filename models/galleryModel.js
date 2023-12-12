const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  Albumtitle: {
    type: String,
    required: true,
  },
  images: [
    {
      imageUrl: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
