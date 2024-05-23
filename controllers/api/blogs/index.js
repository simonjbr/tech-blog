const router = require('express').Router();
const { User, Blog, Comment } = require('../../../models');

// import custom middleware
const isLoggedIn = require('../../../utils/auth');

// /api/blogs/:id route for individual blog page
router.get('/:id', isLoggedIn, async (req, res) => {
	try {
		const blogId = req.params.id;
		const dbBlogData = await Blog.findByPk(blogId, {
			include: [User, Comment],
		});

		// serialize data for rendering
		const blog = dbBlogData.get({ plain: true });

		res.render('blog', {
			blog,
		})
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;