const express = require('express');
const router = express.Router();
const userRouter = require('./user.router')
const postRouter = require('./post.router')

router.use('/users', userRouter);
router.use('/posts', postRouter);
module.exports = router;