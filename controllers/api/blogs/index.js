const router = require('express').Router();
const { User, Blog, Comment } = require('../../../models');

// import custom middleware
const isLoggedIn = require('../../../utils/auth');

// /api/blogs/edit/:id to render edit blog page
router.get('/edit/:id', isLoggedIn, async (req, res) => {
	try {
		const blogId = req.params.id;
		const dbBlogData = await Blog.findByPk(blogId, {
			include: [
				{
					model: User,
				},
				{
					model: Comment,
					include: User
				}
			],
		});

		// serialize data for rendering
		const blog = dbBlogData.get({ plain: true });

		// render edit blog page
		res.render('edit-blog', {
			blog,
			user_id: req.session.user_id,
			loggedIn: req.session.logged_in,
		});

	} catch (error) {
		res.status(500).json(error);
	}
});

// /api/blogs/edit/:id PUT route to update existing blogs
router.put('/edit/:id', isLoggedIn, async (req, res) => {
	try {
		// extract blog id from route parameter
		const blogId = req.params.id;

		const updateBlog = await Blog.update({
			title: req.body.title,
			content: req.body.content,
		},
			{
				where: {
					id: blogId,
				}
			});

		res.status(200).json(updateBlog);
	} catch (error) {
		res.status(500).json(error);
	}
});

// /api/blogs/delete/:id route for deleting blogs by id
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
	try {
		// extract id from route parameters
		const blogId = req.params.id;

		const deleteBlog = await Blog.destroy({
			where: {
				id: blogId
			}
		});

		res.status(200).json(deleteBlog);
	} catch (error) {
		res.status(500).json(error);
	}
});

// /api/blogs/:id route for individual blog page
router.get('/:id', async (req, res) => {
	try {
		const blogId = req.params.id;
		const dbBlogData = await Blog.findByPk(blogId, {
			include: [
				{
					model: User,
				},
				{
					model: Comment,
					include: User
				}
			],
		});

		// serialize data for rendering
		const blog = dbBlogData.get({ plain: true });

		// render individual blog page
		res.render('blog', {
			blog,
			user_id: req.session.user_id,
			loggedIn: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

// /api/blogs POST route to create new blog
router.post('/', isLoggedIn, async (req, res) => {
	try {
		// create new blog object
		const newBlog = await Blog.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.session.user_id
		});

		res.status(200).json(newBlog);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;