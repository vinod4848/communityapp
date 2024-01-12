const {
  Phone,
  Accessories,
  Tablets,
  Bicycles,
  Bike,
  Car,
} = require("../models/productModel");

const createPhone = async (req, res) => {
  try {
    const phone = await Phone.create(req.body);
    res.status(201).json(phone);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.create(req.body);
    res.status(201).json(accessories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTablets = async (req, res) => {
  try {
    const tablets = await Tablets.create(req.body);
    res.status(201).json(tablets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBicycles = async (req, res) => {
  try {
    const bicycles = await Bicycles.create(req.body);
    res.status(201).json(bicycles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBike = async (req, res) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.find().populate("userId").exec();
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.find().populate("userId").exec();
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTablets = async (req, res) => {
  try {
    const tablets = await Tablets.find().populate("userId").exec();
    res.status(200).json(tablets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBicycles = async (req, res) => {
  try {
    const bicycles = await Bicycles.find().populate("userId").exec();
    res.status(200).json(bicycles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate("userId").exec();
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("userId").exec();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPhoneById = async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id).populate("userId").exec();
    if (!phone) {
      return res.status(404).json({ error: "Phone not found" });
    }
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAccessoriesById = async (req, res) => {
  try {
    const accessories = await Accessories.findById(req.params.id)
      .populate("userId")
      .exec();
    if (!accessories) {
      return res.status(404).json({ error: "Accessories not found" });
    }
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTabletsById = async (req, res) => {
  try {
    const tablets = await Tablets.findById(req.params.id)
      .populate("userId")
      .exec();
    if (!tablets) {
      return res.status(404).json({ error: "Tablets not found" });
    }
    res.status(200).json(tablets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBicyclesById = async (req, res) => {
  try {
    const bicycles = await Bicycles.findById(req.params.id)
      .populate("userId")
      .exec();
    if (!bicycles) {
      return res.status(404).json({ error: "Bicycles not found" });
    }
    res.status(200).json(bicycles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id).populate("userId").exec();
    if (!bike) {
      return res.status(404).json({ error: "Bike not found" });
    }
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("userId").exec();
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePhone = async (req, res) => {
  try {
    const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!phone) {
      return res.status(404).json({ error: "Phone not found" });
    }
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!accessories) {
      return res.status(404).json({ error: "Accessories not found" });
    }
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTablets = async (req, res) => {
  try {
    const tablets = await Tablets.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tablets) {
      return res.status(404).json({ error: "Tablets not found" });
    }
    res.status(200).json(tablets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBicycles = async (req, res) => {
  try {
    const bicycles = await Bicycles.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bicycles) {
      return res.status(404).json({ error: "Bicycles not found" });
    }
    res.status(200).json(bicycles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bike) {
      return res.status(404).json({ error: "Bike not found" });
    }
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePhone = async (req, res) => {
  try {
    const phone = await Phone.findByIdAndDelete(req.params.id);
    if (!phone) {
      return res.status(404).json({ error: "Phone not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.findByIdAndDelete(req.params.id);
    if (!accessories) {
      return res.status(404).json({ error: "Accessories not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTablets = async (req, res) => {
  try {
    const tablets = await Tablets.findByIdAndDelete(req.params.id);
    if (!tablets) {
      return res.status(404).json({ error: "Tablets not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBicycles = async (req, res) => {
  try {
    const bicycles = await Bicycles.findByIdAndDelete(req.params.id);
    if (!bicycles) {
      return res.status(404).json({ error: "Bicycles not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) {
      return res.status(404).json({ error: "Bike not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
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
};
