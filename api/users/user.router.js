const { createUser, getUsersById, getUsers, updateUser, deleteUser, login } = require('./user.controller');
const router = require ('express').Router();
const { chekToken } = require('../../auth/token_validation');

router.post('/',chekToken, createUser);
router.get('/',chekToken, getUsers);
router.get('/:id',chekToken, getUsersById);
router.patch('/',chekToken, updateUser);
router.delete('/',chekToken, deleteUser);
router.post('/login', login);


module.exports = router;