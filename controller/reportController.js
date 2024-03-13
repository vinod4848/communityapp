const Report = require("../models/reportModel");
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
  const fileName = `Reports/${file.originalname}`;

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
const createReport = async (req, res) => {
  try {
    const { description, status, assignedTo, reportBy } = req.body;

    const newReport = new Report({
      description,
      status,
      assignedTo,
      reportBy,
    });

    const savedReport = await newReport.save();

    res.status(201).json(savedReport);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("assignedTo")
      .populate("reportBy");

    if (reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }

    res.json(reports);
  } catch (error) {
    console.error("Error getting reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("assignedTo")
      .populate("reportBy");

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.error("Error getting report by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateReportById = async (req, res) => {
  try {
    const updateReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(updateReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteReportById = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const reportImage = async (req, res) => {
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

    const updateReport = await Report.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updateReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(updateReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReportById,
  deleteReportById,
  reportImage,
};
