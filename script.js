document.querySelectorAll(".current-year").forEach((yearItem) => {
  yearItem.textContent = new Date().getFullYear();
});

document.body.classList.add("js-enabled");

const activePage = document.body.getAttribute("data-page");
if (activePage) {
  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === activePage;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      return;
    }

    contactForm.reset();
    contactForm.classList.remove("was-validated");

    if (formMessage) {
      formMessage.classList.remove("d-none");
    }
  });
}

const buildFallback = (img) => {
  const label = img.getAttribute("data-fallback-label") || "Add Canva Export Here";
  const replacement = document.createElement("div");
  replacement.className = "image-fallback";
  replacement.textContent = label;
  img.replaceWith(replacement);
};

document.querySelectorAll("img[data-fallback-label]").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) {
    buildFallback(img);
    return;
  }

  img.addEventListener("error", () => buildFallback(img));
});
