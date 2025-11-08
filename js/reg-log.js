document.addEventListener('DOMContentLoaded', function() {
  const registerBox = document.getElementById('register-box');
  const loginBox = document.getElementById('login-box');
  const showLogin = document.getElementById('show-login');
  const showRegister = document.getElementById('show-register');
  const profileWrap = document.querySelector('.profile-wrap');
  const profilePage = document.querySelector('.profile-page');

  // Initialize users array in localStorage if it doesn't exist
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  // Check if user is logged in
  function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && profileWrap) {
      const user = JSON.parse(currentUser);
      profileWrap.style.display = 'block';
      if (profilePage) profilePage.style.display = 'none';
      
      // Update profile with user data
      const nameInput = document.getElementById('nameInput');
      const greetingText = document.getElementById('greetingText');
      if (nameInput) nameInput.value = user.name;
      if (greetingText) greetingText.textContent = `Hello, ${user.name}!`;
      
      // Load saved rating
      const savedRating = localStorage.getItem(`rating_${user.email}`);
      if (savedRating) {
        const rating = parseInt(savedRating);
        const stars = document.querySelectorAll('#stars .star');
        const ratingLabel = document.getElementById('ratingLabel');
        stars.forEach((star, index) => {
          if (index < rating) star.classList.add('active');
        });
        if (ratingLabel) ratingLabel.textContent = `Your rating: ${rating}/5`;
      }
    } else {
      if (profileWrap) profileWrap.style.display = 'none';
      if (profilePage) profilePage.style.display = 'block';
    }
  }

  // Check auth on page load
  checkAuth();

  if (showLogin) {
    showLogin.addEventListener('click', function (e) {
      e.preventDefault();
      if (registerBox) registerBox.style.display = 'none';
      if (loginBox) loginBox.style.display = 'block';
    });
  }

  if (showRegister) {
    showRegister.addEventListener('click', function (e) {
      e.preventDefault();
      if (loginBox) loginBox.style.display = 'none';
      if (registerBox) registerBox.style.display = 'block';
    });
  }

  // Helper function to show error
  function showError(input, message) {
    // Remove existing error
    const existingError = input.parentElement.querySelector('.error-msg');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorMsg = document.createElement('small');
    errorMsg.className = 'error-msg';
    errorMsg.textContent = message;
    errorMsg.style.color = '#e53935';
    errorMsg.style.fontSize = '12px';
    errorMsg.style.marginTop = '4px';
    errorMsg.style.display = 'block';
    
    input.classList.add('invalid');
    input.parentElement.appendChild(errorMsg);
  }

  // Helper function to clear errors
  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  // Handle registration
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      
      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const passwordInput = document.getElementById('reg-password');
      const confirmInput = document.getElementById('reg-confirm');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirm = confirmInput.value;

      let isValid = true;

      // Name validation
      if (name.length < 2) {
        showError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      }

      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(emailInput, 'Enter a valid email address.');
        isValid = false;
      }

      // Password validation
      if (password.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters.');
        isValid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        showError(passwordInput, 'Password must contain at least one uppercase letter, one lowercase letter, and one number.');
        isValid = false;
      }

      // Confirm password validation
      if (password !== confirm) {
        showError(confirmInput, 'Passwords do not match.');
        isValid = false;
      }

      // Check if user already exists
      if (isValid) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users.find(u => u.email === email)) {
          showError(emailInput, 'User with this email already exists.');
          isValid = false;
        }
      }

      if (!isValid) {
        return;
      }

      // Save user
      const users = JSON.parse(localStorage.getItem('users'));
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-msg';
      successMsg.textContent = 'Registration successful!';
      successMsg.style.color = '#4caf50';
      successMsg.style.padding = '10px';
      successMsg.style.marginTop = '10px';
      successMsg.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
      successMsg.style.borderRadius = '6px';
      successMsg.style.textAlign = 'center';
      
      registerForm.insertBefore(successMsg, registerForm.firstChild);
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
      registerForm.reset();
      clearErrors();
      checkAuth();
    });
  }

  // Handle login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      
      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      let isValid = true;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(emailInput, 'Enter a valid email address.');
        isValid = false;
      }

      if (password.trim() === '') {
        showError(passwordInput, 'Please enter your password.');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Check credentials
      const users = JSON.parse(localStorage.getItem('users'));
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-msg';
        successMsg.textContent = 'Login successful!';
        successMsg.style.color = '#4caf50';
        successMsg.style.padding = '10px';
        successMsg.style.marginTop = '10px';
        successMsg.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        successMsg.style.borderRadius = '6px';
        successMsg.style.textAlign = 'center';
        
        loginForm.insertBefore(successMsg, loginForm.firstChild);
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
        
        loginForm.reset();
        clearErrors();
        checkAuth();
      } else {
        showError(emailInput, 'Invalid email or password.');
      }
    });
  }

  // Logout functionality
  window.logout = function() {
    localStorage.removeItem('currentUser');
    checkAuth();
    if (registerBox) registerBox.style.display = 'block';
    if (loginBox) loginBox.style.display = 'none';
  };
});




