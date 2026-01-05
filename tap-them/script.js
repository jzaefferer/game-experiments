function randomColor() {
  const colors = ["#fa26a0", "#05dfd7", "#a3f7bf", "#a3f7bf", "#fff591"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function clamp(min, max) {
  return (value) => Math.min(Math.max(value, min), max);
}

function randomHorizontal() {
  return clamp(50, window.innerWidth - 100)(Math.random() * window.innerWidth);
}

function randomVertical() {
  return clamp(
    50,
    window.innerHeight - 100
  )(Math.random() * window.innerHeight);
}

function randomType() {
  const types = ["square", "circle", "tile"];
  return types[Math.floor(Math.random() * types.length)];
}

function createElement() {
  const element = document.createElement("div");
  element.classList.add("element", randomType());
  element.style.left = `${randomHorizontal()}px`;
  element.style.top = `${randomVertical()}px`;
  element.style.background = randomColor();
  canvas.appendChild(element);
}

const canvas = document.getElementById("canvas");
for (let i = 0; i <= 10; i++) {
  createElement();
}

function handle(event) {
  if (
    event.target.classList.contains("element") &&
    !event.target.classList.contains("fadeOut")
  ) {
    event.target.classList.add("fadeOut");
    setTimeout(() => {
      event.target.remove();
    }, 500);
    createElement();
    const audio = document.getElementById("tink");
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play();
  }
}

canvas.addEventListener("click", function (event) {
  handle(event);
});
canvas.addEventListener("touchstart", function (event) {
  handle(event);
});

document.querySelector("button").addEventListener("click", function (event) {
  event.currentTarget.remove();
  canvas.requestFullscreen();
});
