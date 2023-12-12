const MatrimonialProfile = require('../models/matrimonialModel'); 

const matrimonialController = {
  getAllProfiles: async (req, res) => {
    try {
      const profiles = await MatrimonialProfile.find();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfileById: async (req, res) => {
    try {
      const profile = await MatrimonialProfile.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addProfile: async (req, res) => {
    try {
      const newProfile = new MatrimonialProfile(req.body);
      const savedProfile = await newProfile.save();
      res.status(201).json(savedProfile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const updatedProfile = await MatrimonialProfile.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const deletedProfile = await MatrimonialProfile.findByIdAndDelete(
        req.params.id
      );
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = matrimonialController;
