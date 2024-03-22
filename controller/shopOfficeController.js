const ShopOffice = require("../models/ShopOfficeModel");
const User = require("../models/userV1Model");
const Notification = require("../models/notificationModel");

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

  const fileName = `ShopOffice/${file.originalname}`;
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

const uploadshopOfficeImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const images = await Promise.all(
      req.files.map((file) => uploadImage(file))
    );

    if (!images.every((image) => image)) {
      return res
        .status(400)
        .json({ error: "Failed to upload one or more images" });
    }

    const updateData = { ...req.body, images };

    const updatedFurniture = await ShopOffice.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedFurniture) {
      return res.status(404).json({ message: "ShopOffice not found" });
    }

    res.status(200).json(updatedFurniture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllShopOffices = async (req, res) => {
  try {
    const shopOffices = await ShopOffice.find()
    .populate("profileId")
    .populate("approvedby");
    res.json(shopOffices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShopOfficeById = async (req, res) => {
  try {
    const shopOffice = await ShopOffice.findById(req.params.id).populate(
      "profileId"
    );
    if (!shopOffice) {
      return res.status(404).json({ message: "Shop office not found" });
    }
    res.json(shopOffice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createShopOffice = async (req, res) => {
  try {
    const newFurniture = await ShopOffice.create(req.body);
    const allUsers = await User.find({}, "username");
    const notificationPromises = allUsers.map((user) => {
      const notificationData = {
        title: "New ShopOffice Post",
        message: `A new ShopOffice post "${newFurniture.adTitle}" has been added.`,
        timestamp: Date.now(),
        isRead: false,
        userId: user._id,
      };

      console.log("Creating Notification:", notificationData);

      return Notification.create(notificationData);
    });

    await Promise.all(notificationPromises);

    console.log("Notifications sent to all users.");

    res.status(201).json(newFurniture);
  } catch (error) {
    console.error("Error creating ShopOffice and notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateShopOffice = async (req, res) => {
  try {
    const shopOffice = await ShopOffice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!shopOffice) {
      return res.status(404).json({ message: "Shop office not found" });
    }

    res.json(shopOffice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteShopOffice = async (req, res) => {
  try {
    const shopOffice = await ShopOffice.findByIdAndRemove(req.params.id);

    if (!shopOffice) {
      return res.status(404).json({ message: "Shop office not found" });
    }

    res.json({ message: "Shop office deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadshopOfficeImages,
  getAllShopOffices,
  getShopOfficeById,
  createShopOffice,
  updateShopOffice,
  deleteShopOffice,
};
