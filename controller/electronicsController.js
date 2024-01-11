const Electronics = require("../models/electronicsAndAppliancesModel");

const createElectronics = async (req, res) => {
  try {
    const electronics = new Electronics({
      userId: req.body.userId,
      adTitle: req.body.adTitle,
      description: req.body.description,
      price: req.body.price,
      photos: req.body.photos,
    });

    const savedElectronics = await electronics.save();
    res.json(savedElectronics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllElectronics = async (req, res) => {
  try {
    const electronics = await Electronics.find();
    res.json(electronics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getElectronicsById = async (req, res) => {
  try {
    const electronics = await Electronics.findById(req.params.id);
    res.json(electronics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateElectronics = async (req, res) => {
  try {
    const updatedElectronics = await Electronics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedElectronics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteElectronics = async (req, res) => {
  try {
    const deletedElectronics = await Electronics.findByIdAndRemove(
      req.params.id
    );
    res.json(deletedElectronics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createElectronics,
  getAllElectronics,
  getElectronicsById,
  updateElectronics,
  deleteElectronics,
};
