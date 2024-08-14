const User = require('./User');
const Post = require('./Post');

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Post, {through: 'favorities'});
Post.belongsToMany(User, {through: 'favorities'});

