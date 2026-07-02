let index = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let interval;

// create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
    resetAuto();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

// buttons
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAuto();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAuto();
});

// auto rotate
function startAuto() {
  interval = setInterval(nextSlide, 4000);
}

function resetAuto() {
  clearInterval(interval);
  startAuto();
}

startAuto();

// initialize first state
showSlide(0);