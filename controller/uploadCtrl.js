const fs = require("fs");
const {
  cloudinaryuplodeImg,
  cloudinaryuplodeDeleteimg,
} = require("../controller/utils/cloudinary");
const asyncHandler = require("express-async-handler");
const uploadimgs = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryuplodeImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      console.log(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteimgs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryuplodeDeleteimg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadimgs,
  deleteimgs,
};