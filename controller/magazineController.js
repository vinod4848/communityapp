const Magazine = require("../models/magazineModel");
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
  const fileName = `Magazine/${file.originalname}`;

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

const getAllMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.find();
    res.json(magazines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMagazine = async (req, res) => {
  const { title, date } = req.body;

  try {
    const newMagazine = new Magazine({
      title,
      date,
    });

    const savedMagazine = await newMagazine.save();
    res.status(201).json(savedMagazine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const uploadMagazinepdf = async (req, res) => {
  try {
    const file = req.file;
    const image = await uploadImage(file);
    const updateData = { ...req.body, image };

    const updatedMagazine = await Magazine.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedMagazine) {
      return res.status(404).json({ message: "Magazine not found" });
    }
    res.status(200).json(updatedMagazine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMagazine = async (req, res) => {
  try {
    const deletedMagazine = await Magazine.findByIdAndDelete(req.params.id);
    if (!deletedMagazine) {
      return res.status(404).json({ message: "Magazine not found" });
    }
    res.status(200).json({ message: "Magazine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMagazines,
  createMagazine,
  uploadImage,
  uploadMagazinepdf,
  deleteMagazine,
};
