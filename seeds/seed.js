require('dotenv').config();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

// import seed data from .jsons
const userData = require('./userData.json');
const blogData = require('./blogData.json');

// seeding function
const seedDatabase = async () => {
	// refresh db tables
	await sequelize.sync({ force: true });

	// bulk create users
	const users = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	// loop to create blogs and randomly assign user_id
	for (const blog of blogData) {
		await Blog.create({
			...blog,
			user_id: users[Math.floor(Math.random() * users.length)].id,
		});
	}

	// manually kill process
	process.exit(0)
};

// execute seeding function
seedDatabase();