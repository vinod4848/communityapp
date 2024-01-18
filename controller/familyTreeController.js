const { Individual } = require("../models/familyTreeModel");

const createIndividual = async (req, res) => {
  try {
    const individual = new Individual(req.body);
    const savedIndividual = await individual.save();
    res.json(savedIndividual);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIndividual = async (req, res) => {
  try {
    const individual = await Individual.findById(req.params.id)
      .populate("userId")
      .exec();
    if (!individual) {
      return res.status(404).json({ error: "Individual not found" });
    }
    res.json(individual);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllIndividual = async (req, res) => {
  try {
    const allIndividuals = await Individual.find().populate("userId").exec();
    res.json(allIndividuals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIndividual = async (req, res) => {
  try {
    const updatedIndividual = await Individual.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIndividual) {
      return res.status(404).json({ error: "Individual not found" });
    }
    res.json(updatedIndividual);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIndividual = async (req, res) => {
  try {
    const deletedIndividual = await Individual.findByIdAndDelete(req.params.id);
    if (!deletedIndividual) {
      return res.status(404).json({ error: "Individual not found" });
    }
    res.json(deletedIndividual);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIndividual,
  getIndividual,
  getAllIndividual,
  updateIndividual,
  deleteIndividual,
};
