// ===== FORM VALIDATION =====
document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.querySelector("#register-form");
  const loginForm = document.querySelector("#login-form");

  // === Валидация формы регистрации ===
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.querySelector("#reg-name");
      const email = document.querySelector("#reg-email");
      const pass = document.querySelector("#reg-password");
      const confirm = document.querySelector("#reg-confirm");

      let valid = true;

      if (name.value.trim().length < 2) {
        showError(name, "Name must be at least 2 characters.");
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
      }

      if (pass.value.length < 6) {
        showError(pass, "Password must be at least 6 characters.");
        valid = false;
      }

      if (confirm.value !== pass.value) {
        showError(confirm, "Passwords do not match.");
        valid = false;
      }

      if (valid) {
        alert("Registration successful! (demo)");
        regForm.reset();
      }
    });
  }

  // === Валидация формы входа ===
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const email = document.querySelector("#login-email");
      const pass = document.querySelector("#login-password");

      let valid = true;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
      }

      if (pass.value.trim() === "") {
        showError(pass, "Please enter your password.");
        valid = false;
      }

      if (valid) {
        alert("Login successful! (demo)");
        loginForm.reset();
      }
    });
  }

  // === Функции ошибок ===
  function showError(input, message) {
    const small = document.createElement("small");
    small.className = "error-msg";
    small.textContent = message;
    input.classList.add("invalid");
    input.parentElement.appendChild(small);
  }

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((el) => el.remove());
    document.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  }
});


// ===== FAQ ACCORDION =====
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion__item");

  items.forEach(item => {
    const header = item.querySelector(".accordion__header");
    const content = item.querySelector(".accordion__content");

    // изначально скрыто
    content.style.maxHeight = "0px";

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // закрыть все
      items.forEach(i => {
        i.classList.remove("is-open");
        i.querySelector(".accordion__content").style.maxHeight = "0px";
      });

      // открыть текущий, если он был закрыт
      if (!isOpen) {
        item.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("toggle-theme");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
    });
  }
});
