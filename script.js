const openLetter = document.querySelector("#openLetter");
const openEffect = document.querySelector("#openEffect");
const letter = document.querySelector("#letter");
const hero = document.querySelector(".hero");
const daysSinceMeet = document.querySelector("#daysSinceMeet");
const bgMusic = document.querySelector("#bgMusic");
const musicToggle = document.querySelector("#musicToggle");
const yesButton = document.querySelector("#yesButton");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

const colors = ["#c84f67", "#d7a83c", "#7fb59d", "#f2a8a1", "#ffffff"];
let hasOpenedLetter = false;

function syncMusicButton() {
  const isPlaying = !bgMusic.paused;
  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute("aria-label", isPlaying ? "暂停音乐" : "播放音乐");
}

async function playMusic() {
  try {
    await bgMusic.play();
    syncMusicButton();
  } catch {
    syncMusicButton();
  }
}

function toggleMusic() {
  if (bgMusic.paused) {
    playMusic();
  } else {
    bgMusic.pause();
    syncMusicButton();
  }
}

function updateDaysSinceMeet() {
  const startDate = new Date(2023, 4, 11);
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dayLength = 24 * 60 * 60 * 1000;
  const days = Math.floor((todayOnly - startDate) / dayLength);
  daysSinceMeet.textContent = String(days);
}

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

function revealLetter(event) {
  event.preventDefault();

  if (hasOpenedLetter) {
    letter.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  hasOpenedLetter = true;
  playMusic();
  openLetter.classList.add("is-busy");
  hero.classList.add("is-opening");
  openEffect.classList.add("is-active");

  window.setTimeout(() => {
    document.body.classList.remove("content-locked");
    document.body.classList.add("content-open");
    openEffect.classList.remove("is-active");
    openLetter.classList.remove("is-busy");
    hero.classList.remove("is-opening");
  }, 2350);
}

updateDaysSinceMeet();
syncMusicButton();
openLetter.addEventListener("click", revealLetter);
musicToggle.addEventListener("click", toggleMusic);
bgMusic.addEventListener("play", syncMusicButton);
bgMusic.addEventListener("pause", syncMusicButton);
yesButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalPanel);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalPanel();
  }
});
