const Electronics = require("../models/electronicsAndAppliancesModel");
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

  const fileName = `Electronics/${file.originalname}`;
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

const uploadElectronicsImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const images = await Promise.all(req.files.map(file => uploadImage(file)));

    if (!images.every(image => image)) {
      return res.status(400).json({ error: "Failed to upload one or more images" });
    }

    const updateData = { ...req.body, images };

    const updatedElectronics = await Electronics.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedElectronics) {
      return res.status(404).json({ message: "Electronics not found" });
    }

    res.status(200).json(updatedElectronics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const createElectronics = async (req, res) => {
  try {
    const electronics = new Electronics({
      userId: req.body.userId,
      electronicsAndAppliances: req.body.electronicsAndAppliances,
      adTitle: req.body.adTitle,
      description: req.body.description,
      price: req.body.price,
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
  uploadElectronicsImages,
};
