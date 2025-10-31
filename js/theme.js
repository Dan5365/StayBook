// apply saved theme on load 
(function() {
  let saved = localStorage.getItem("theme"); // "day" or "night"
  if (saved === "night") {
    document.body.classList.add("theme-night");
  }
})();


function setDay() {
  document.body.classList.remove("theme-night");
  localStorage.setItem("theme", "day");
}
function setNight() {
  document.body.classList.add("theme-night");
  localStorage.setItem("theme", "night");
}


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
