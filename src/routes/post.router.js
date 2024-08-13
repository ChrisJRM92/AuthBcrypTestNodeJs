const { getAll, create, getOne, remove, update } = require('../controllers/post.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');


const routerPosts = express.Router();

routerPosts.route('/').get( getAll).post(verifyJwt, create);
routerPosts.route('/:id').get(getOne).delete(verifyJwt, remove).put(verifyJwt, update);

module.exports = routerPosts;