const Job = require("../models/jobModel");
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
  const fileName = `Logo/${file.originalname}`;

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
const jobController = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find().populate("userId").populate("approvedby");
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getJobById: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate("userId");
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchJobByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res
          .status(400)
          .json({ message: "Please provide a title parameter" });
      }

      const jobs = await Job.find({ title: new RegExp(title, "i") }).populate(
        "userId"
      );

      if (jobs.length === 0) {
        return res
          .status(404)
          .json({ message: "No jobs found with the provided title" });
      }

      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addJob: async (req, res) => {
    try {
      const newJob = await Job.create(req.body);
      const allUsers = await User.find({Job: true }, "username");
      const notificationPromises = allUsers.map((user) => {
        const notificationData = {
          title: "New Job Post",
          message: `A new Job post "${newJob.title}" has been added.`,
          timestamp: Date.now(),
          isRead: false,
          userId: user._id,
        };

        console.log("Creating Notification:", notificationData);

        return Notification.create(notificationData);
      });

      await Promise.all(notificationPromises);

      console.log("Notifications sent to all users.");

      res.status(201).json(newJob);
    } catch (error) {
      console.error("Error creating Job and notifications:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateJob: async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteJob: async (req, res) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(req.params.id);
      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  approveJob: async (req, res) => {
    try {
      const { jobId } = req.params;

      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Unauthorized to approve jobs" });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      job.isApproved = true;
      job.isPublic = true;
      job.approvedBy = req.user._id; // Assuming approvedBy is a reference to the user who approved the job
      await job.save();

      res.status(200).json({ message: "Job approved successfully", job });
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

      const logoUpdate = await Job.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (!logoUpdate) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.status(200).json(logoUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = jobController;
