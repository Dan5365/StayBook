document.addEventListener("keydown", function (e) {
  // stop working while typing in inputs or textareas
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  // get navbar links (change selector if navbar class is different)
  var links = document.querySelectorAll(".navbar__buttons a, nav a, .menu a");

  if (e.key === "1" && links[0]) links[0].click();
  else if (e.key === "2" && links[1]) links[1].click();
  else if (e.key === "3" && links[2]) links[2].click();
  else if (e.key === "4" && links[3]) links[3].click();
  else if (e.key === "5" && links[4]) links[4].click();
  else if (e.key === "6") {
    var btn = document.getElementById("nav-dropdown-btn");
    if (btn) btn.click();
  }
});
