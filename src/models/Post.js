const { DataTypes } = require("sequelize");
const sequelize = require('../utils/connection');

const Post = sequelize.define('posts', {
  post: {
    type: DataTypes.TEXT
  }
});

module.exports = Post;
