const addCommentHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// get reference to comment input
	const commentInput = document.querySelector('#comment-input');

	// extract content and id data
	const content = commentInput.value;
	const user_id = commentInput.dataset.userId;
	const blog_id = commentInput.dataset.blogId;

	if (!user_id) {
		document.location.replace('/login');
		return;
	}

	// form validation
	if (content) {
		// send fetch POST request to /api/comments
		const response = await fetch('/api/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content,
				user_id,
				blog_id
			}),
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert('Failed to post new comment.');
		}
	}

};

document
	.querySelector('#comment-form')
	.addEventListener('submit', addCommentHandler);