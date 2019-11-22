import * as AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
const router = require('express').Router();

//
router.get('/authen', AuthController.authen)
router.post('/login', AuthController.login)
router.post('/', AuthController.checkAuthen, UserController.createUser)
router.put('/', AuthController.checkAuthen, UserController.updateUser)
router.get('/', AuthController.checkAuthen, UserController.getUsers)
router.delete('/:user_id', UserController.deleteUser)

module.exports = router;

