function initializeProfileUI() {
  // ==== Greeting (name input) ====
  let nameInput = document.getElementById("nameInput");
  let saveNameBtn = document.getElementById("saveNameBtn");
  let greetingText = document.getElementById("greetingText");

  // Get name from current user
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    if (greetingText) greetingText.textContent = "Hello, " + user.name + "!";
    if (nameInput) nameInput.value = user.name;
  }

  if (saveNameBtn) {
    saveNameBtn.addEventListener("click", function () {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        if (window.showError) {
          window.showError("Please log in to update your profile.");
        }
        return;
      }

      let name = (nameInput && nameInput.value) ? nameInput.value.trim() : "";
      if (name.length > 0) {
        greetingText.textContent = "Hello, " + name + "!";
        
        // Update user in localStorage
        const user = JSON.parse(currentUser);
        user.name = name;
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
          users[userIndex].name = name;
          localStorage.setItem("users", JSON.stringify(users));
        }
      } else {
        greetingText.textContent = "Hello!";
      }
   
      let snd = document.getElementById("clickSound");
      if (snd) { snd.currentTime = 0; snd.play(); }
    });
  }

  // ==== Rating + Sound + Quote ====
  let stars = document.querySelectorAll("#stars .star");
  let ratingLabel = document.getElementById("ratingLabel");
  let quoteBox = document.getElementById("quoteBox");

  
  let quotesBad = [
    "Tough day? Small steps count.",
    "It’s okay to pause and breathe.",
    "Every dip is temporary."
  ];
  let quotesMid = [
    "Steady is progress.",
    "One task at a time.",
    "Keep going, you’re doing fine."
  ];
  let quotesGood = [
    "Let’s go! You’ve got this.",
    "Great energy — use it well!",
    "Momentum is your friend."
  ];

  function pickRandom(arr) {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
  }

  function setRating(value) {
  
    for (let i = 0; i < stars.length; i++) {
      let v = parseInt(stars[i].getAttribute("data-value"), 10);
      if (v <= value) {
        stars[i].classList.add("active");
      } else {
        stars[i].classList.remove("active");
      }
    }
    
    if (ratingLabel) ratingLabel.textContent = "Your rating: " + value + "/5";

   
    let quote = "";
    if (value <= 2) {
      quote = pickRandom(quotesBad);
    } else if (value === 3) {
      quote = pickRandom(quotesMid);
    } else {
      quote = pickRandom(quotesGood);
    }
    if (quoteBox) {
      const quoteText = quoteBox.querySelector('p');
      if (quoteText) {
        quoteText.textContent = quote;
      } else {
        quoteBox.innerHTML = `<ion-icon name="chatbubble-outline"></ion-icon><p>${quote}</p>`;
      }
    }

    // Save rating to localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      localStorage.setItem(`rating_${user.email}`, value.toString());
    }

    let snd = document.getElementById("clickSound");
    if (snd) { snd.currentTime = 0; snd.play(); }
  }

 
  for (let j = 0; j < stars.length; j++) {
    stars[j].addEventListener("click", function () {
      let val = parseInt(this.getAttribute("data-value"), 10);
      setRating(val);
    });
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeProfileUI();
  
  // Listen for login events to reinitialize
  window.addEventListener('userLoggedIn', function() {
    setTimeout(initializeProfileUI, 300);
  });
});
