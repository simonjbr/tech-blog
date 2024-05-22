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

		req.session.user_id = newUser.isSoftDeleted;
		req.session.logged_in = true;

		res.status(200).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;