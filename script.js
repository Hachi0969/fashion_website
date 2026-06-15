const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".status-dot"));
const newsletter = document.querySelector(".newsletter");

let currentSlide = 0;
const slideDelay = 5200;

function showSlide(nextIndex) {
  slides[currentSlide].classList.remove("is-active");
  dots[currentSlide].classList.remove("is-active");

  currentSlide = nextIndex;

  slides[currentSlide].classList.add("is-active");
  dots[currentSlide].classList.add("is-active");
}

function advanceSlide() {
  const nextSlide = (currentSlide + 1) % slides.length;
  showSlide(nextSlide);
}

if (slides.length > 1) {
  window.setInterval(advanceSlide, slideDelay);
}

newsletter.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletter.reset();
});
