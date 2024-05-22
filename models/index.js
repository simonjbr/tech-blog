// import models so we can set up their relationships
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// set up one-to-many relationship between User and Blog
User.hasMany(Blog, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
	foreignKey: 'user_id',
});

// set up one-to-many relationship between User and Comment
User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
	foreignKey: 'user_id',
});

// set up one-to-many relationship between Blog and Comment
Blog.hasMany(Comment, {
	foreignKey: 'blog_id',
	onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
	foreignKey: 'blog_id',
});

module.exports = {
	User,
	Blog,
	Comment,
};