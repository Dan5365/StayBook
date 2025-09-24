  const registerBox = document.getElementById('register-box');
  const loginBox = document.getElementById('login-box');
  const showLogin = document.getElementById('show-login');
  const showRegister = document.getElementById('show-register');

  showLogin.addEventListener('click', function (e) {
    e.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
  });

  showRegister.addEventListener('click', function (e) {
    e.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
  });


  

