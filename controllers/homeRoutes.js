const router = require('express').Router();
const { User, Blog } = require('../models');

// get all blogs for homepage
router.get('/', async (req, res) => {
	try {
		// find all blogs in db
		const dbBlogData = await Blog.findAll({
			include: User,
		});

		// serialize blog data
		const blogs = dbBlogData.map((blog) =>
			blog.get({ plain: true })
		);

		res.status(200).render('homepage', {
			blogs,
			loggedIn: req.session.logged_in,
		});

	} catch (error) {
		res.status(500).json(error);
	}
});

// signup page
router.get('/signup', async (req, res) => {
	try {
		// if logged in redirect to homepage
		if (req.session.logged_in) {
			res.redirect('/');
			return;
		}

		// otherwise render signup page
		res.status(200).render('signup', {
			loggedIn: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

// login page
router.get('/login', async (req, res) => {
	try {
		// if logged in redirect to homepage
		if (req.session.logged_in) {
			res.redirect('/');
			return;
		}

		// otherwise render login page
		res.status(200).render('login', {
			loggedIn: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

// logout route
router.get('/logout', async (req, res) => {
	try {
		// if logged in kill session
		if (req.session.logged_in) {
			req.session.destroy(() => {
				res.status(204).redirect('/');
			});
		} else {
			res.status(404).end();
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;