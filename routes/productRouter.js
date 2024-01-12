const express = require("express");
const router = express.Router();
const {
  createPhone,
  createAccessories,
  createTablets,
  createBicycles,
  createBike,
  createCar,
  getAllPhones,
  getAllAccessories,
  getAllTablets,
  getAllBicycles,
  getAllBikes,
  getAllCars,
  getPhoneById,
  getAccessoriesById,
  getTabletsById,
  getBicyclesById,
  getBikeById,
  getCarById,
  updatePhone,
  updateAccessories,
  updateTablets,
  updateBicycles,
  updateBike,
  updateCar,
  deletePhone,
  deleteAccessories,
  deleteTablets,
  deleteBicycles,
  deleteBike,
  deleteCar,
} = require("../controller/productController");

router.post("/phones", createPhone);
router.get("/phones", getAllPhones);
router.get("/phones/:id", getPhoneById);
router.put("/phones/:id", updatePhone);
router.delete("/phones/:id", deletePhone);

router.post("/accessories", createAccessories);
router.get("/accessories", getAllAccessories);
router.get("/accessories/:id", getAccessoriesById);
router.put("/accessories/:id", updateAccessories);
router.delete("/accessories/:id", deleteAccessories);

router.post("/tablets", createTablets);
router.get("/tablets", getAllTablets);
router.get("/tablets/:id", getTabletsById);
router.put("/tablets/:id", updateTablets);
router.delete("/tablets/:id", deleteTablets);

router.post("/bicycles", createBicycles);
router.get("/bicycles", getAllBicycles);
router.get("/bicycles/:id", getBicyclesById);
router.put("/bicycles/:id", updateBicycles);
router.delete("/bicycles/:id", deleteBicycles);

router.post("/bikes", createBike);
router.get("/bikes", getAllBikes);
router.get("/bikes/:id", getBikeById);
router.put("/bikes/:id", updateBike);
router.delete("/bikes/:id", deleteBike);

router.post("/cars", createCar);
router.get("/cars", getAllCars);
router.get("/cars/:id", getCarById);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;
