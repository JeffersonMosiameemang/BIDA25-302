(() => {
  const yearTargets = document.querySelectorAll(".current-year");
  yearTargets.forEach((el) => {
    el.textContent = new Date().getFullYear().toString();
  });

  const fadeEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window && fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  }

  const contactForm = document.getElementById("contactForm");
  const submitMessage = document.getElementById("formSubmitMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add("was-validated");
        return;
      }

      contactForm.classList.add("was-validated");
      if (submitMessage) {
        submitMessage.classList.remove("d-none");
      }
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    });
  }
})();
