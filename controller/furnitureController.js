const Furniture = require("../models/furnitureModel");
const AWS = require("aws-sdk");
const fs = require("fs");

const uploadImage = async (file) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = "AP-SOUTH-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });

  const fileName = `Furniture/${file.originalname}`;
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileStream,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        reject(err);
      }
      console.log("S3 Upload Data:", data);
      resolve(data.Location);
    });
  });
};

const uploadFurnitureImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const images = await Promise.all(req.files.map(file => uploadImage(file)));

    if (!images.every(image => image)) {
      return res.status(400).json({ error: "Failed to upload one or more images" });
    }

    const updateData = { ...req.body, images };

    const updatedFurniture = await Furniture.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedFurniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    res.status(200).json(updatedFurniture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createFurniture = async (req, res) => {
  try {
    const { userId, furnitureType, adTitle, description, price,address,landmark } = req.body;
    const newFurniture = new Furniture({
      userId,
      furnitureType,
      adTitle,
      description,
      address,
      landmark,
      price,
    });
    const savedFurniture = await newFurniture.save();

    res.status(201).json(savedFurniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFurniture = async (req, res) => {
  try {
    const allFurniture = await Furniture.find()
    .populate("userId");
    res.status(200).json(allFurniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFurnitureById = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id)
    .populate("userId");
    if (!furniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }
    res.status(200).json(furniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFurniture = async (req, res) => {
  try {
    const updatedFurniture = await Furniture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFurniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }
    res.status(200).json(updatedFurniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFurniture = async (req, res) => {
  try {
    const deletedFurniture = await Furniture.findByIdAndRemove(req.params.id);
    if (!deletedFurniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }
    res.status(200).json({ message: "Furniture deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFurniture,
  getAllFurniture,
  getFurnitureById,
  updateFurniture,
  deleteFurniture,
  uploadFurnitureImages,
};
