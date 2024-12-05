const router = require('express').Router();
const PetController = require('../controller/PetController');


const verifyToken = require('../helpers/verify-token');
const {imagesUpload} = require('../helpers/image-upload');

router.post ('/create',verifyToken, imagesUpload.array('images'), PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getMyPets);
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions);
router.get('/:id', PetController.getPetById);
router.delete('/:id',verifyToken, PetController.removePetById);
router.patch('/:id', verifyToken, imagesUpload.array('images'), PetController.updatePet);
router.patch ('/schedule/:id', verifyToken, PetController.schedule);
router.patch('conclude/:id', verifyToken, PetController.concludeAdoption);


module.exports = router;
