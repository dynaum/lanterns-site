// Lanterns marketing site — progressive enhancement.
// Assumes the page is fully usable without this script.

(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Mobile menu toggle.
  const menuBtn = document.querySelector(".site-nav__menu");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.hasAttribute("hidden") === false;
      if (open) {
        mobileMenu.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileMenu.removeAttribute("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      }
    });
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobileMenu.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Section fade-in on scroll. Skip when reduced motion is requested.
  if (!reduced && "IntersectionObserver" in window) {
    document.querySelectorAll("main > .section").forEach((el) => {
      el.classList.add("section--will-fade");
    });
    const reveal = (el) => {
      el.classList.add("section--faded-in");
      io.unobserve(el);
    };
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("main > .section").forEach((el) => io.observe(el));
    // Failsafe: if a tool or non-scrolling client never triggers the IO
    // (search bots, screenshot capture, jumped-to-anchor loads), reveal
    // anything still hidden after a beat so content is never permanently
    // invisible.
    setTimeout(() => {
      document.querySelectorAll("main > .section--will-fade:not(.section--faded-in)").forEach(reveal);
    }, 1500);
  }

  // 3. Demo iframe focus hint — when the user clicks the iframe, hide the hint after a beat.
  const demoFrame = document.querySelector(".demo__frame iframe");
  const demoHint = document.querySelector(".demo__hint");
  if (demoFrame && demoHint) {
    demoFrame.addEventListener("focus", () => {
      demoHint.style.opacity = "0.5";
    });
  }
})();
