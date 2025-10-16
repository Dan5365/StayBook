document.addEventListener("DOMContentLoaded", () => {
  // ==== Task 4: Popup ====
  const openBtn = document.getElementById("popup-open");
  const closeBtn = document.getElementById("popup-close");
  const overlay = document.getElementById("popup-overlay");

  if (openBtn && closeBtn && overlay) {
    openBtn.onclick = () => overlay.classList.remove("popup-hidden");
    closeBtn.onclick = () => overlay.classList.add("popup-hidden");
    overlay.onclick = e => {
      if (e.target === overlay) overlay.classList.add("popup-hidden");
    };
  }

  // ==== Task 5: Date & Time ====
  const datetimeContainer = document.getElementById("datetime-container");
  if (datetimeContainer) {
    function updateDateTime() {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      datetimeContainer.textContent = `${date} — ${time}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
  }
});
