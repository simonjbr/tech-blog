const router = require('express').Router();
// import user model
const { User } = require('../../../models');

// /api/users/signup create new user
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.create({
			username: req.body.username,
			password: req.body.password,
		});

		req.session.user_id = newUser.id;
		req.session.logged_in = true;

		res.status(200).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

// /api/users/login create new user
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: {
				username: req.body.username,
			}
		});

		if (!userData) {
			res.status(400).json({
				message: 'Incorrect username or password.'
			});
			return;
		}

		const isValidPassword = await userData.isCorrectPassword(req.body.password);

		if (!isValidPassword) {
			res.status(400).json({
				message: 'Incorrect username or password.'
			});
			return;
		}

		req.session.user_id = userData.id;
		req.session.logged_in = true;

		res.status(200).json({ user: userData, message: 'Successfully logged in.' });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;