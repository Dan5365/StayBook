document.addEventListener("keydown", function (e) {
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  let links = document.querySelectorAll(".navbar__buttons a, nav a, .menu a");

  if (e.key === "1" && links[0]) links[0].click();
  else if (e.key === "2" && links[1]) links[1].click();
  else if (e.key === "3" && links[2]) links[2].click();
  else if (e.key === "4" && links[3]) links[3].click();
  else if (e.key === "5" && links[4]) links[4].click();
  else if (e.key === "6") {
    let btn = document.getElementById("nav-dropdown-btn");
    if (btn) btn.click();
  }
});
