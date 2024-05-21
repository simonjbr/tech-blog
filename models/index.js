// import models so we can set up their relationships
const User = require('./User');
const Blog = require('./Blog');

// set up one-to-many relationship between User and Blog
User.hasMany(Blog, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
	foreignKey: 'user_id',
});

module.exports = {
	User,
	Blog
};