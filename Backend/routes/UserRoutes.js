const express = require('express');
const router = express.Router(); // Instancia o Router do Express

const UserController = require('../controller/UserController');

// middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

// Rotas de usuários
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UserController.editUser
);

module.exports = router; // Exporta o router
