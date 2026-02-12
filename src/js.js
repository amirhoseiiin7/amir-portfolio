console.log("JS connected ✅");

// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2, // مدت زمان smooth scroll
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing دلخواه
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: true, // برای موبایل هم smooth
});
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

const textBlocks = document.querySelectorAll(".about-text");

// IntersectionObserver برای انیمیشن خطوط اولیه
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll(".line");
        lines.forEach((line) => line.classList.add("reveal"));
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  },
);

textBlocks.forEach((block) => observer.observe(block));

// ////////////////////////////////////////////
// //////////////////// ABOUT BOX /////////////

// /////////////////////////////////////////////////////////////

const frontBarBlocks = document.querySelectorAll(".frontend-skills");

// IntersectionObserver برای انیمیشن خطوط اولیه
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".bar-box");
        bars.forEach((bars) => bars.classList.add("reveal"));
        observer2.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  },
);

frontBarBlocks.forEach((block) => observer2.observe(block));
//////////////////////////////////////////////////////////////
const backBarBlocks = document.querySelectorAll(".backend-skills");

// IntersectionObserver برای انیمیشن خطوط اولیه
const observer3 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll(".bar-box");
        lines.forEach((line) => line.classList.add("reveal"));
        observer3.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  },
);

backBarBlocks.forEach((block) => observer3.observe(block));
// //////////////////////////////////////////////////////////////////////////

// new Swiper(".swiper", {
//   modules: [Pagination, Autoplay],
//   loop: true,
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });
// new Swiper(".swiper", {
//   loop: true,
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false,
//   },
// });

// if (document.querySelector(".swiper")) {
//   const swiper = new Swiper(".swiper", {
//     loop: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });
// }
//////////////////////////////////////////////////////////
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(
  ".bottom-2 button, .bottom-4 button",
);
const progressBar = document.querySelector(".progress-bar");
let autoAdvanceTimer;
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.querySelector(".carousel-track");

// Add touch events for swipe
carousel.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

carousel.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true },
);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.className = "carousel-item absolute top-0 left-0 w-full h-full";
    if (index === currentSlide) {
      slide.classList.add("active");
    } else if (index === (currentSlide + 1) % slides.length) {
      slide.classList.add("next");
    } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
      slide.classList.add("prev");
    } else {
      slide.classList.add("hidden");
    }
  });

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.className = `w-8 sm:w-12 h-1 sm:h-1.5 rounded-full transition-colors ${
      index === currentSlide ? "bg-white/40" : "bg-white/20"
    } hover:bg-white/60`;
  });
}

function resetAutoAdvance() {
  clearInterval(autoAdvanceTimer);
  autoAdvanceTimer = setInterval(nextSlide, 5000);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
  resetAutoAdvance();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
  resetAutoAdvance();
}

// Add click handlers to indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    updateSlides();
    resetAutoAdvance();
  });
});

// Initialize auto advance
resetAutoAdvance();

// Initialize slides
updateSlides();
// ////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////
const button = document.querySelector(".send");

button.addEventListener("click", () => {
  gsap
    .timeline()
    .to(".icon ion-icon", 0.4, { x: -8, y: 8, transition: "none" })
    .to(".icon ion-icon", 0.4, { x: "50vw", y: "-50vh" })
    .set(".icon ion-icon", { x: "-50vw", y: "50vh" })
    .to(".icon ion-icon", 0.3, { x: 0, y: 0 });
});
// //////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////
// MAKE CURRENT YEAR WORK

const yearEL = document.querySelector(".year");
const currentyear = new Date().getFullYear();
yearEL.textContent = currentyear;
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// حلقه raf برای بروزرسانی lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// اسکرول نرمال به هدف با کلیک روی لینک‌ها
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target); // scroll نرم به target
    }
  });
});
const sections = document.querySelectorAll("[data-snap]");

sections.forEach((section, index) => {
  section.dataset.index = index;
});

lenis.on("scroll", ({ scroll }) => {
  const viewportHeight = window.innerHeight;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < viewportHeight / 2) {
      // موقعیت بخش در وسط viewport
      // اگر خواستی میتونی highlight یا کلاس اضافه کنی
    }
  });
});
// const sections = [...document.querySelectorAll("section")];
let snapTimeout;

lenis.on("scroll", () => {
  clearTimeout(snapTimeout);

  snapTimeout = setTimeout(() => {
    let closest = sections[0];
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);

      if (distance < minDistance) {
        minDistance = distance;
        closest = section;
      }
    });

    lenis.scrollTo(closest, {
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }, 160); // وقتی اسکرول تموم شد
});

