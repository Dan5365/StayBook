document.addEventListener("DOMContentLoaded", function () {
  // ==== Greeting (name input) ====
  let nameInput = document.getElementById("nameInput");
  let saveNameBtn = document.getElementById("saveNameBtn");
  let greetingText = document.getElementById("greetingText");


  let savedName = localStorage.getItem("profileName");
  if (savedName) {
    greetingText.textContent = "Hello, " + savedName + "!";
    if (nameInput) nameInput.value = savedName;
  }

  if (saveNameBtn) {
    saveNameBtn.addEventListener("click", function () {
      let name = (nameInput && nameInput.value) ? nameInput.value.trim() : "";
      if (name.length > 0) {
        greetingText.textContent = "Hello, " + name + "!";
        localStorage.setItem("profileName", name);
      } else {
        greetingText.textContent = "Hello!";
        localStorage.removeItem("profileName");
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
    if (quoteBox) quoteBox.textContent = quote;


    let snd = document.getElementById("clickSound");
    if (snd) { snd.currentTime = 0; snd.play(); }
  }

 
  for (let j = 0; j < stars.length; j++) {
    stars[j].addEventListener("click", function () {
      let val = parseInt(this.getAttribute("data-value"), 10);
      setRating(val);
    });
  }
});
