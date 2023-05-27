// Get the form element
const form = document.querySelector('form');

// Add an event listener for form submission
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);

  // Create an object to hold the user state
  const userState = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    accessToken: generateAccessToken()
  };

  // Store the user state in local storage
  localStorage.setItem('userState', JSON.stringify(userState));

  // Redirect the user to the profile page
  window.location.href = "profile.html";
});

// Generate a random access token
function generateAccessToken() {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes, (byte) => byte.toString(16)).join('');
}

// Check if the user is logged in
function isLoggedIn() {
  const userState = JSON.parse(localStorage.getItem('userState'));
  return userState && userState.accessToken;
}

// Check if the user is logged out
function isLoggedOut() {
  const userState = JSON.parse(localStorage.getItem('userState'));
  return !userState || !userState.accessToken;
}

// Redirect the user to the signup page if they are not logged in
function requireLogin() {
  if (isLoggedOut()) {
    window.location.href = "signup.html";
  }
}

// Redirect the user to the profile page if they are logged in
function requireLogout() {
  if (isLoggedIn()) {
    window.location.href = "profile.html";
  }
}

// Get the logout button element
const logoutButton = document.querySelector('#logout');

// Add an event listener for logout button click
logoutButton.addEventListener('click', () => {
  // Clear the user state from local storage
  localStorage.removeItem('userState');

  // Redirect the user to the signup page
  window.location.href = "singup.html";
});

// Show or hide success and error messages after form submission
const successMessage = document.querySelector('#success-message');
const errorMessage = document.querySelector('#error-message');

if (successMessage && errorMessage) {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('success')) {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
  } else if (urlParams.has('error')) {
    successMessage.style.display = 'none';
    errorMessage.style.display = 'block';
  }
}

// Display user's details on profile page
const profile = document.querySelector('#profile');

if (profile) {
  if (isLoggedIn()) {
    const userState = JSON.parse(localStorage.getItem('userState'));

    profile.style.display = 'block';
    profile.querySelector('#name').textContent = userState.name;
    profile.querySelector('#email').textContent = userState.email;
    profile.querySelector('#accessToken').textContent = userState.accessToken;
  } else {
    window.location.href = "signup.html";
  }
}



       
