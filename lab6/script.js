const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = root.dataset.theme !== "light";
    root.dataset.theme = isLight ? "light" : "dark";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.innerHTML = isLight ? "☾ <span>Theme</span>" : "☼ <span>Theme</span>";
  });
}

document.querySelectorAll(".flip-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".gallery-card");
    if (!card) return;
    const flipped = card.classList.toggle("is-flipped");
    card.querySelectorAll(".flip-button").forEach((control) => {
      control.setAttribute("aria-pressed", String(flipped));
    });
  });
});
