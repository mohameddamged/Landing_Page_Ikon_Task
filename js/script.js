document.addEventListener("DOMContentLoaded", () => {
  // 1. changing words in the hero section
  const words = ["أكثر", "اسرع"];
  let wordIndex = 0;
  const dynamicWordEl = document.getElementById("dynamic-word");

  if (dynamicWordEl) {
    setInterval(() => {
      dynamicWordEl.style.opacity = "0";
      dynamicWordEl.style.transform = "translateY(-8px)";
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        dynamicWordEl.textContent = words[wordIndex];
        dynamicWordEl.style.opacity = "1";
        dynamicWordEl.style.transform = "translateY(0)";
      }, 300);
    }, 2500);
  }

  // 2. offer popup with countdown timer
  const offerPopup = document.getElementById("offer-popup");
  const closeOfferBtn = document.getElementById("close-offer-btn");
  const offerForm = document.getElementById("offer-form");

  const hoursEl = document.getElementById("offer-hours");
  const minutesEl = document.getElementById("offer-minutes");
  const secondsEl = document.getElementById("offer-seconds");

  const hoursRing = document.getElementById("hours-ring");
  const minutesRing = document.getElementById("minutes-ring");
  const secondsRing = document.getElementById("seconds-ring");

  const CIRCUMFERENCE = 2 * Math.PI * 28; // 175.93
  let totalSeconds = (23 * 3600) + (50 * 60) + 20;

  function setRingProgress(ringEl, value, max) {
    if (!ringEl) return;
    const offset = CIRCUMFERENCE - (value / max) * CIRCUMFERENCE;
    ringEl.style.strokeDashoffset = offset;
  }

  function updateCountdown() {
    if (totalSeconds <= 0) return;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(mins).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(secs).padStart(2, "0");

    setRingProgress(hoursRing, hrs, 24);
    setRingProgress(minutesRing, mins, 60);
    setRingProgress(secondsRing, secs, 60);

    totalSeconds--;
  }

  if (hoursEl && minutesEl && secondsEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  if (closeOfferBtn && offerPopup) {
    closeOfferBtn.addEventListener("click", () => {
      offerPopup.style.display = "none";
    });
  }

  if (offerForm) {
    offerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("offer-email");
      alert(`تم إرسال العرض الخاص إلى: ${emailInput.value}`);
      emailInput.value = "";
    });
  }
  

  // 3. stepper functionality
  const stepItems = document.querySelectorAll(".step-item");
  const progressBar = document.getElementById("stepper-progress");

  stepItems.forEach((item) => {
    item.addEventListener("click", () => {
      const stepNum = parseInt(item.getAttribute("data-step"), 10);
      stepItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      if (progressBar) {
        if (stepNum === 1) progressBar.style.width = "15%";
        if (stepNum === 2) progressBar.style.width = "50%";
        if (stepNum === 3) progressBar.style.width = "100%";
      }
    });
  });

  // 4. changing laptop image based on selected solution
  const tabButtons = document.querySelectorAll(".tab-btn");
  const previewImg = document.getElementById("solution-preview-img");
  const defaultLaptopSrc = previewImg ? previewImg.src : "";

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

    });
  });

  // 5. testimonial slider functionality
  const track = document.getElementById("testimonials-track");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");
  const cards = document.querySelectorAll(".testimonial-card");
  let currentSlide = 0;

  function updateSlider() {
    if (!track || cards.length === 0) return;
    track.style.transform = `translateX(${currentSlide * 100}%)`;
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % cards.length;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + cards.length) % cards.length;
      updateSlider();
    });
  }

  // 6. newsletter form functionality
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      alert(`تم الاشتراك بنجاح بالبريد: ${input.value}`);
      input.value = "";
    });
  }
});