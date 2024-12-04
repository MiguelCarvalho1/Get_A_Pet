const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validation
    if (!name || !email || !phone || !password || !confirmpassword) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }
    if (password !== confirmpassword) {
      return res
        .status(422)
        .json({ message: "Password and confirm password should be same" });
    }

    //check if user exist
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ message: "Email already exist" });
    }

    //create  password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });
    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create user" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }
    if (!password) {
      return res.status(404).json({ message: "Password required!" });
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }
    //create token
    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;
    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "ourSecret");
      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  }
  //Edit user
  static async editUser(req, res) {
    const id = req.params.id;
    const token = getToken(req);
    const user = await getUserByToken(token);

 
    if(req.file){
        user.image = req.file.filename;
    }

    // validation
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, password, phone, confirmpassword } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    user.name = name;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // verify email
    const userExists = await User.findOne({ email });
    if (user.email !== email && userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    user.email = email;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    } else if (password === confirmpassword && password != null) {
      // Hash new password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }
    user.phone = phone;

    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      ); //save user

      res.status(200).json({
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
