const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');


const routerUser = express.Router();

routerUser.route('/').get(verifyJwt, getAll).post(create);
routerUser.route('/:id').get(verifyJwt, getOne).delete(verifyJwt, remove).put(verifyJwt, update);
routerUser.route('/me').post(login)

module.exports = routerUser;