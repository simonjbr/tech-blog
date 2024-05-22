// event handler for signup form submit
const signupHandler = async (event) => {
	// prevent default form behaviour
	event.preventDefault();

	// extract values from form fields
	const username = document.querySelector('#username-input').value;
	const password = document.querySelector('#password-input').value;

	console.log(username, password);

	// form validation
	if (username && password) {
		// api request to create new user
		const response = await fetch('/api/users/signup', {
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
			alert('Failed to sign up.');
		}
	}

};

// event llistener for signup form submit
document
	.querySelector('#signup-form')
	.addEventListener('submit', signupHandler);