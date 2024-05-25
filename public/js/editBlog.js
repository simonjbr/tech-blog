const editBlogHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract blog data from form fields
	const title = document.querySelector('#title-input').value;
	const content = document.querySelector('#content-input').value;

	// extract ids from data attributes
	const blogId = document.querySelector('#title-input').dataset.blogId;

	// form validation
	if (title && content) {
		// send fetch PUT request to /api/blogs/edit/:id
		const response = await fetch(`/api/blogs/edit/${blogId}`, {
			method: 'PUT',
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
			alert('Failed to update blog.');
		}
	} else {
		alert('Please include values for Title and Content.');
	}
};

// add event listener for edit blog form
document
	.querySelector('#edit-blog-form')
	.addEventListener('submit', editBlogHandler);