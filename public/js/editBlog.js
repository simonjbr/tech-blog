// event handler for updating blogs
const editBlogHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract blog data from form fields
	const title = document.querySelector('#title-input').value;
	const content = document.querySelector('#content-input').value;

	// extract id from data attributes
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

// event handler for deleting blogs
const deleteBlogHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract id from data attributes
	const blogId = document.querySelector('#title-input').dataset.blogId;

	// fetch delete request to /api/blogs/delete/:id
	const response = await fetch(`/api/blogs/delete/${blogId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert('Failed to delete blog.');
	}

};

// event listener for edit blog form
document
	.querySelector('#edit-blog-form')
	.addEventListener('submit', editBlogHandler);

// event listener for delete blog
document
	.querySelector('#delete-btn')
	.addEventListener('click', deleteBlogHandler);