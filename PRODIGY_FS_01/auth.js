// Register Logic
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Save user credentials in localStorage (For demo only, not secure)
    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Registration successful! You can now log in.');

    // Redirect to login page
    window.location.href = 'index.html';
});

// Login Logic
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve stored user credentials
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Simulate user being logged in by setting a session flag
        sessionStorage.setItem('loggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'protected.html';
    } else {
        alert('Invalid email or password.');
    }
});

// Protecting the Protected Route
window.addEventListener('load', function() {
    if (window.location.pathname.endsWith('protected.html')) {
        // Check if the user is logged in
        const isLoggedIn = sessionStorage.getItem('loggedIn');
        if (!isLoggedIn) {
            alert('You must be logged in to access this page.');
            window.location.href = 'index.html';
        }
    }
});

// Logout Logic
document.getElementById('logoutButton')?.addEventListener('click', function() {
    // Perform the logout action (clear session and redirect to login page)
    sessionStorage.removeItem('loggedIn');
    alert('Logging out...');
    window.location.href = 'index.html';  // Redirect to login page
});
