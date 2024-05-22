const router = require('express').Router();
const { User, Blog } = require('../models');

// get all blogs for homepage
router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll({
			raw: true,
			include: User,
		});

		res.status(200).render('homepage', {
			blogs,
		});

	} catch (error) {
		res.status(500).json(error);
	}
});

// signup page
router.get('/signup', async (req, res) => {
	try {
		res.status(200).render('signup');
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;