const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  qualifications: {
    type: [String],
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry Level", "Mid Level", "Senior Level"],
    required: true,
  },
  educationLevel: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: null,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.isPublic;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
