const router = require('express').Router();
const { User, Blog, Comment } = require('../../../models');

// import custom middleware
const isLoggedIn = require('../../../utils/auth');

// /api/comments POST new comment route
router.post('/', isLoggedIn, async (req, res) => {
	try {
		const newComment = await Comment.create({
			content: req.body.content,
			blog_id: req.body.blog_id,
			user_id: req.session.user_id,
		});

		res.status(200).json(newComment);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;