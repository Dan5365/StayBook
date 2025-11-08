// apply saved theme on load 
(function() {
  let saved = localStorage.getItem("theme"); // "day" or "night"
  if (saved === "night") {
    document.body.classList.add("theme-night");
  }
  updateThemeButtons();
})();


function setDay() {
  document.body.classList.remove("theme-night");
  localStorage.setItem("theme", "day");
  updateThemeButtons();
}
function setNight() {
  document.body.classList.add("theme-night");
  localStorage.setItem("theme", "night");
  updateThemeButtons();
}

function updateThemeButtons() {
  const dayBtn = document.getElementById("theme-day");
  const nightBtn = document.getElementById("theme-night");
  const isNight = document.body.classList.contains("theme-night");
  
  if (dayBtn && nightBtn) {
    if (isNight) {
      dayBtn.style.opacity = "0.6";
      nightBtn.style.opacity = "1";
    } else {
      dayBtn.style.opacity = "1";
      nightBtn.style.opacity = "0.6";
    }
  }
}

// Button click handlers
document.addEventListener("DOMContentLoaded", function() {
  const dayBtn = document.getElementById("theme-day");
  const nightBtn = document.getElementById("theme-night");

  if (dayBtn) {
    dayBtn.addEventListener("click", setDay);
  }

  if (nightBtn) {
    nightBtn.addEventListener("click", setNight);
  }

  updateThemeButtons();
});


document.addEventListener("keydown", function(e) {
  let tag = document.activeElement.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  if (e.key === "d" || e.key === "D") setDay();
  if (e.key === "n" || e.key === "N") setNight();
});


let tbtn = document.getElementById("theme-toggle");
if (tbtn) {
  tbtn.addEventListener("click", function() {
    if (document.body.classList.contains("theme-night")) setDay();
    else setNight();
  });
}
