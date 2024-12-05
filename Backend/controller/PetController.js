const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const Pet = require("../models/Pet");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async create(req, res) {
    const { name, age, species, weight, color } = req.body;
    const available = true;
    const images = req.files;

    //upload

    //validation
    if (!name || !age || !species || !weight || !color || images.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const token = getToken(req);
    const user = await getUserByToken(token);
    const pet = new Pet({
      name,
      age,
      species,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });
    try {
      const newPet = await pet.save();
      return res.status(201).json(newPet);
    } catch (error) {
      return res.status(400).json({ message: "Error creating pet" });
    }
  }

  //get all pets
  static async getAll(req, res) {
    try {
      const pets = await Pet.find().sort("-createAt");
      return res.status(200).json(pets);
    } catch (err) {
      return res.status(400).json({ message: "Error getting pets" });
    }
  }
  //get my all pets
  static async getMyPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    try {
      const pets = await Pet.find({ "user._id": user._id }).sort("-createAt");
      return res.status(200).json(pets);
    } catch (err) {
      return res.status(400).json({ message: "Error getting pets" });
    }
  }

  //get my all adoptions
  static async getAllUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    try {
      const adoptions = await Adoption.find({ "adopter._id": user._id }).sort(
        "-createAt"
      );
      return res.status(200).json(adoptions);
    } catch (err) {
      return res.status(400).json({ message: "Error getting adoptions" });
    }
  }

  //get pet by id
  static async getPetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID is invalidate" });
    }
    try {
      const pet = await Pet.findOne({ _id: id });
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      return res.status(200).json(pet);
    } catch (error) {
      return res.status(400).json({ message: "Error getting pet" });
    }
  }

  // Remove Pet by id
  static async removePetById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID is invalidate" });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);
    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ message: "You are not the owner of this pet" });
    }

    try {
      const pet = await Pet.findOneAndRemove(id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      return res.status(200).json({ message: "Pet removed" });
    } catch (error) {
      return res.status(400).json({ message: "Error removing pet" });
    }
  }

  //update pet
  static async updatePet(req, res) {
    const id = req.params.id;
    const { name, age, species, weight, color, available } = req.body;

    const images = req.files;

    const updateData = {};

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);
    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ message: "You are not the owner of this pet" });
    }

    if (!name || !age || !species || !weight || !color || images.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      updateData.images = [];
      images.map((image) => {
        updateData.images.push(image.filename);
      });
    }
    await Pet.findByIdAndUpdate(id, updateData);
    return res.status(200).json({ message: "Pet updated" });
  }

  //schedule
  static async schedule(req, res) {
    const id = req.params.id;

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);
    if (pet.user._id.equals(user._id)) {
      return res
        .status(422)
        .json({ message: "You can't schedule a viewing with your own pet" });
    }

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        return res
          .status(422)
          .json({ message: "You've already scheduled a visit for this pet!" });
      }
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };
    await Pet.findByIdAndUpdate(id, pet);
    return res
      .status(200)
      .json({
        message: `The appointment was successfully scheduled ${pet.user.name} contact us by phone ${pet.user.phone}`,
      });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);
    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ message: "You are not the owner of this pet" });
    }

    pet.available = false;
    await Pet.findByIdAndUpdate(id, pet);
    return res
      .status(200)
      .json({ message: `The adoption was successfully concluded` });
  }
};
