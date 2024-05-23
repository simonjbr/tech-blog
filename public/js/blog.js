const createBlogHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract blog data from form fields
	const title = document.querySelector('#title-input').value;
	const content = document.querySelector('#content-input').value;

	// form validation
	if (title && content) {
		// send fetch POST request to /api/blogs
		const response = await fetch('/api/blogs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title,
				content,
			}),
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to post new blog.');
		}
	} else {
		alert('Please include values for Title and Content.');
	}
};

// add event listener for add new blog form
document
	.querySelector('#blog-form')
	.addEventListener('submit', createBlogHandler);