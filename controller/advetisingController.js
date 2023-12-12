const Advertising = require('../models/advertisingModel');

const advertisingController = {
  getAllAdvertisements: async (req, res) => {
    try {
      const advertisements = await Advertising.find();
      res.status(200).json(advertisements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAdvertisementById: async (req, res) => {
    try {
      const advertisement = await Advertising.findById(req.params.id);
      if (!advertisement) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
      res.status(200).json(advertisement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addAdvertisement: async (req, res) => {
    try {
      const newAdvertisement = new Advertising(req.body);
      const savedAdvertisement = await newAdvertisement.save();
      res.status(201).json(savedAdvertisement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateAdvertisement: async (req, res) => {
    try {
      const updatedAdvertisement = await Advertising.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAdvertisement) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
      res.status(200).json(updatedAdvertisement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteAdvertisement: async (req, res) => {
    try {
      const deletedAdvertisement = await Advertising.findByIdAndDelete(
        req.params.id
      );
      if (!deletedAdvertisement) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchAdvertising: async (req, res) => {
    try {
      const { campaignName } = req.query;

      if (!campaignName) {
        return res.status(400).json({ message: 'Please provide a campaignName parameter' });
      }

      const advertisements = await Advertising.find({
        campaignName: new RegExp(campaignName, 'i'),
      });

      if (advertisements.length === 0) {
        return res.status(404).json({ message: 'No advertisements found with the provided campaignName' });
      }

      res.status(200).json(advertisements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = advertisingController;
