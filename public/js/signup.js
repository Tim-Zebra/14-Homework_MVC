const signupFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  console.log('\n\n\n\n\nThis happended\n\n\n\n\n\n');
  // console.log('This happended', usernameEl, passwordEl);
  // If a username and password is entered, create and account
  if (usernameEl && passwordEl) {

    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ usernameEl, passwordEl }),
      headers: { 'Content-Type': 'application/json' },
  });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
