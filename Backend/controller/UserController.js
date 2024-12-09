const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  // Função de registro
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // Validação dos campos
    if (!name || !email || !phone || !password || !confirmpassword) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }
    if (password !== confirmpassword) {
      return res
        .status(422)
        .json({ message: "Password and confirm password should be same" });
    }

    // Verificar se o usuário já existe
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ message: "Email already exist" });
    }

    // Criar senha criptografada
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criar usuário
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

  // Função de login
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }

    // Criar token de autenticação
    await createUserToken(user, req, res);
  }

  // Verificar usuário logado
  static async checkUser(req, res) {
    let currentUser;
    if (req.headers.authorization) {
      const token = getToken(req);
      try {
        const decoded = jwt.verify(token, "ourSecret");
        currentUser = await User.findById(decoded.id);
        currentUser.password = undefined;  // Não retornar a senha
      } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      currentUser = null;
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).send(currentUser);
  }

  // Buscar usuário por ID
  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  }

  // Editar usuário
  static async editUser(req, res) {
    const id = req.params.id;
    const token = getToken(req);
    const user = await getUserByToken(token);

    // Verificar se o usuário está autenticado
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Atualizar imagem, se fornecida
    if (req.file) {
      user.image = req.file.filename;
    }

    // Validação dos campos
    const { name, email, password, phone, confirmpassword } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    user.name = name;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Verificar se o email já está em uso
    if (email !== user.email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    user.email = email;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    } else if (password && confirmpassword) {
      // Hash da nova senha
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
      ); // Atualizar o usuário no banco de dados

      res.status(200).json({
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
