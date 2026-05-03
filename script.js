const yesButton = document.querySelector("#yesButton");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

const colors = ["#c84f67", "#d7a83c", "#7fb59d", "#f2a8a1", "#ffffff"];

function launchConfetti() {
  for (let i = 0; i < 72; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3400);
  }
}

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  launchConfetti();
}

function closeModalPanel() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

yesButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalPanel);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalPanel();
  }
});
