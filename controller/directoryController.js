const Directory = require("../models/directoryModel");
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
  const fileName = `Directory/${file.originalname}`;

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
const directoryController = {
  getAllDirectories: async (req, res) => {
    try {
      const directories = await Directory.find()
      .populate("profileId")
      .populate("userId")
      .exec();
      res.status(200).json(directories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getDirectoryById: async (req, res) => {
    try {
      const directory = await Directory.findById(req.params.id)
        .populate("userId")
        .exec();
      if (!directory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(200).json(directory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addDirectory: async (req, res) => {
    try {
      const newDirectory = await Directory.create(req.body);
      res.json(newDirectory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateDirectory: async (req, res) => {
    try {
      const updatedDirectory = await Directory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedDirectory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(200).json(updatedDirectory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteDirectory: async (req, res) => {
    try {
      const deletedDirectory = await Directory.findByIdAndDelete(req.params.id);
      if (!deletedDirectory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchDirectory: async (req, res) => {
    try {
      const {
        contactNumber,
        businessArea,
        locality,
        companyName,
        address,
        tags,
      } = req.query;

      const searchQuery = {};

      if (contactNumber) {
        searchQuery.contactNumber = { $regex: new RegExp(contactNumber, "i") };
      }

      if (businessArea) {
        searchQuery.businessArea = { $regex: new RegExp(businessArea, "i") };
      }

      if (locality) {
        searchQuery.locality = { $regex: new RegExp(locality, "i") };
      }

      if (companyName) {
        searchQuery.companyName = { $regex: new RegExp(companyName, "i") };
      }

      if (address) {
        searchQuery.address = { $regex: new RegExp(address, "i") };
      }

      if (tags) {
        searchQuery.tags = { $in: tags };
      }

      const directory = await Directory.findOne(searchQuery)
        .populate("userId")
        .exec();

      if (!directory) {
        return res.status(404).json({ message: "Directory not found" });
      }

      res.status(200).json(directory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  logoImage: async (req, res) => {
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

      const logoUpdate = await Directory.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!logoUpdate) {
        return res.status(404).json({ message: "Directory not found" });
      }

      res.status(200).json(logoUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = directoryController;
