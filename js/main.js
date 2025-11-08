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

  // === Booking Form Validation ===
  const bookingForm = document.querySelector("#booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.querySelector("#name");
      const email = document.querySelector("#email");
      const phone = document.querySelector("#phone");
      const date = document.querySelector("#date");

      let valid = true;

      // Name validation
      if (name.value.trim().length < 2) {
        showError(name, "Name must be at least 2 characters.");
        valid = false;
      }

      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
      }

      // Phone validation (supports various formats)
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
      const phoneClean = phone.value.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(phoneClean) || phoneClean.length < 10) {
        showError(phone, "Enter a valid phone number (e.g., +7 700 123 45 67).");
        valid = false;
      }

      // Date validation
      const selectedDate = new Date(date.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!date.value || selectedDate < today) {
        showError(date, "Please select a valid future date.");
        valid = false;
      }

      if (valid) {
        // Save booking to localStorage
        const booking = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          date: date.value,
          timestamp: new Date().toISOString()
        };
        
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        alert("Booking submitted successfully! We'll contact you soon.");
        bookingForm.reset();
      }
    });
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

      
      items.forEach(i => {
        i.classList.remove("is-open");
        i.querySelector(".accordion__content").style.maxHeight = "0px";
      });

  
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
