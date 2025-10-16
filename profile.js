document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("bg-change-btn");
  const main = document.querySelector(".main");
  if (!btn || !main) return;

  const colors = ["#ffffff", "#fef3c7", "#d1fae5", "#bfdbfe", "#fbcfe8", "#f87171"];

  btn.addEventListener("click", () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    main.style.backgroundColor = randomColor;
  });
});
