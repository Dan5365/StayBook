document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const registerBox = document.getElementById('register-box');
  const loginBox = document.getElementById('login-box');
  const profileWrap = document.querySelector('.profile-wrap');
  const profilePage = document.querySelector('.profile-page');

  // ======================
  //   Инициализация
  // ======================
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  // ======================
  //   Проверка авторизации
  // ======================
  function checkAuth() {
  try {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      if (profileWrap) profileWrap.style.display = 'none';
      if (profilePage) profilePage.style.display = 'block';
      return;
    }

    const user = JSON.parse(currentUser);
    if (!user || !user.name) return;

    if (profileWrap) profileWrap.style.display = 'block';
    if (profilePage) profilePage.style.display = 'none';

    const nameInput = document.getElementById('nameInput');
    const greetingText = document.getElementById('greetingText');

    if (nameInput) nameInput.value = user.name;
    if (greetingText) greetingText.textContent = `Hello, ${user.name}!`;

    setTimeout(() => {
      if (typeof window.loadWeather === 'function') {
        try {
          window.loadWeather();
        } catch (err) {
          console.warn('Weather load failed:', err);
        }
      }
      const event = new Event('userLoggedIn');
      window.dispatchEvent(event);
    }, 300);

  } catch (err) {
    console.error('checkAuth error:', err);
  }
}

  checkAuth();

  // ======================
  //   Переключение форм
  // ======================
  const showLogin = document.getElementById('show-login');
  const showRegister = document.getElementById('show-register');

  if (showLogin) {
    showLogin.addEventListener('click', e => {
      e.preventDefault();
      registerBox.style.display = 'none';
      loginBox.style.display = 'block';
    });
  }

  if (showRegister) {
    showRegister.addEventListener('click', e => {
      e.preventDefault();
      loginBox.style.display = 'none';
      registerBox.style.display = 'block';
    });
  }

  // ======================
  //   Функции для ошибок
  // ======================
  function showError(input, message) {
    const existing = input.parentElement.querySelector('.error-msg');
    if (existing) existing.remove();

    const errorMsg = document.createElement('small');
    errorMsg.className = 'error-msg';
    errorMsg.style.color = '#e74c3c';
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
  }

  // ======================
  //   Регистрация
  // ======================
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const password = document.getElementById('reg-password').value.trim();
      const confirm = document.getElementById('reg-confirm').value.trim();

      if (!name || name.length < 2) {
        showError(document.getElementById('reg-name'), 'Enter a valid name.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(document.getElementById('reg-email'), 'Enter a valid email.');
        return;
      }

      if (password.length < 6) {
        showError(document.getElementById('reg-password'), 'Password must be at least 6 characters.');
        return;
      }

      if (password !== confirm) {
        showError(document.getElementById('reg-confirm'), 'Passwords do not match.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.email === email)) {
        showError(document.getElementById('reg-email'), 'User already exists.');
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      registerForm.reset();
      checkAuth();

      if (window.showSuccess) window.showSuccess('Registration successful!');
    });
  }

  // ======================
  //   Логин
  // ======================
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      clearErrors();

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value.trim();

      if (!email || !password) {
        showError(document.getElementById('login-email'), 'Enter email and password.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        loginForm.reset();
        checkAuth();
        if (window.showSuccess) window.showSuccess('Login successful!');
      } else {
        showError(document.getElementById('login-email'), 'Invalid email or password.');
        if (window.showError) window.showError('Invalid email or password.');
      }
    });
  }

  // ======================
  //   Выход
  // ======================
  window.logout = function() {
    localStorage.removeItem('currentUser');
    checkAuth();
    if (registerBox) registerBox.style.display = 'block';
    if (loginBox) loginBox.style.display = 'none';
  };
});
