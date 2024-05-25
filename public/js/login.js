// event handler for login form submit
const loginHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract values from form fields
	const username = document.querySelector('#username-input').value;
	const password = document.querySelector('#password-input').value;

	// form validation
	if (username && password) {
		// api request to create new user
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// if request successful redirect to homepage else alert
		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to login.');
		}
	}

};

// event listener for login form submit
document
	.querySelector('#login-form')
	.addEventListener('submit', loginHandler);