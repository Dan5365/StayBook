document.addEventListener("DOMContentLoaded", function () {
  // ==== Greeting (name input) ====
  var nameInput = document.getElementById("nameInput");
  var saveNameBtn = document.getElementById("saveNameBtn");
  var greetingText = document.getElementById("greetingText");

  // load saved name (optional but nice)
  var savedName = localStorage.getItem("profileName");
  if (savedName) {
    greetingText.textContent = "Hello, " + savedName + "!";
    if (nameInput) nameInput.value = savedName;
  }

  if (saveNameBtn) {
    saveNameBtn.addEventListener("click", function () {
      var name = (nameInput && nameInput.value) ? nameInput.value.trim() : "";
      if (name.length > 0) {
        greetingText.textContent = "Hello, " + name + "!";
        localStorage.setItem("profileName", name);
      } else {
        greetingText.textContent = "Hello!";
        localStorage.removeItem("profileName");
      }
      // small click sound on save
      var snd = document.getElementById("clickSound");
      if (snd) { snd.currentTime = 0; snd.play(); }
    });
  }

  // ==== Rating + Sound + Quote ====
  var stars = document.querySelectorAll("#stars .star");
  var ratingLabel = document.getElementById("ratingLabel");
  var quoteBox = document.getElementById("quoteBox");

  // simple quote pools
  var quotesBad = [
    "Tough day? Small steps count.",
    "It’s okay to pause and breathe.",
    "Every dip is temporary."
  ];
  var quotesMid = [
    "Steady is progress.",
    "One task at a time.",
    "Keep going, you’re doing fine."
  ];
  var quotesGood = [
    "Let’s go! You’ve got this.",
    "Great energy — use it well!",
    "Momentum is your friend."
  ];

  function pickRandom(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
  }

  function setRating(value) {
    // highlight stars
    for (var i = 0; i < stars.length; i++) {
      var v = parseInt(stars[i].getAttribute("data-value"), 10);
      if (v <= value) {
        stars[i].classList.add("active");
      } else {
        stars[i].classList.remove("active");
      }
    }
    // label
    if (ratingLabel) ratingLabel.textContent = "Your rating: " + value + "/5";

    // pick quote by mood
    var quote = "";
    if (value <= 2) {
      quote = pickRandom(quotesBad);
    } else if (value === 3) {
      quote = pickRandom(quotesMid);
    } else {
      quote = pickRandom(quotesGood);
    }
    if (quoteBox) quoteBox.textContent = quote;

    // play sound
    var snd = document.getElementById("clickSound");
    if (snd) { snd.currentTime = 0; snd.play(); }
  }

  // attach click handlers
  for (var j = 0; j < stars.length; j++) {
    stars[j].addEventListener("click", function () {
      var val = parseInt(this.getAttribute("data-value"), 10);
      setRating(val);
    });
  }
});
