const animate = window.Motion?.animate;

// Fade in and slide up animation
const fadeInUp = (element, delay = 0) => {
  if (!animate) {
    console.error("Motion.animate is not available");
    return null;
  }

  try {
    return element.animate([{ opacity: 1, transform: "translateY(0)" }], {
      duration: 600,
      delay,
      fill: "forwards",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    });
  } catch (error) {
    console.error("Animation error:", error);
    // Fallback to direct style setting
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    return null;
  }
};

// Infinite bounce animation for scroll indicator
const infiniteBounce = (element) => {
  if (!animate) {
    console.error("Motion.animate is not available");
    return null;
  }

  try {
    return element.animate(
      [
        { transform: "translateY(0px)" },
        { transform: "translateY(10px)" },
        { transform: "translateY(0px)" },
      ],
      {
        duration: 1500,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
  } catch (error) {
    console.error("Animation error:", error);
    return null;
  }
};

// Scale on hover animation
const scaleOnHover = (element) => {
  if (!animate) {
    console.error("Motion.animate is not available");
    return;
  }

  element.addEventListener("mouseenter", () => {
    try {
      element.animate(
        { transform: "scale(1.02)" },
        { duration: 200, easing: "ease-out", fill: "forwards" }
      );
    } catch (error) {
      console.error("Animation error:", error);
      element.style.transform = "scale(1.02)";
    }
  });

  element.addEventListener("mouseleave", () => {
    try {
      element.animate(
        { transform: "scale(1)" },
        { duration: 200, easing: "ease-out", fill: "forwards" }
      );
    } catch (error) {
      console.error("Animation error:", error);
      element.style.transform = "scale(1)";
    }
  });
};

// Viewport animation (triggers when element enters viewport)
const createIntersectionObserver = (element, animation) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(element);
  return observer;
};

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  // Check if Motion library is loaded
  if (!window.Motion) {
    console.error("Motion library is not loaded. Animations will not work.");
    // Apply fallback styles to make content visible
    document.querySelectorAll('[style*="opacity: 0"]').forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  document.documentElement.classList.add("dark");
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });

  // Show mobile menu on button click
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = mobileMenuButton?.querySelector("svg");
  let menuOpen = false;

  mobileMenu.classList.add("hidden");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      menuOpen = !menuOpen;

      // Toggle menu visibility with animation
      if (menuOpen) {
        // Show menu with animation
        mobileMenu.classList.remove("hidden");
        mobileMenu.style.opacity = "0";
        mobileMenu.style.transform = "translateY(-10px)";
        mobileMenuButton.classList.toggle("rotate-90");
        // Animate menu appearance
        if (animate) {
          mobileMenu.animate(
            [
              { opacity: 0, transform: "translateY(-10px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 300, easing: "ease-out", fill: "forwards" }
          );
        } else {
          mobileMenu.style.opacity = "1";
          mobileMenu.style.transform = "translateY(0)";
        }

        // Change to X icon
        menuIcon.innerHTML = `
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        `;
      } else {
        // Animate menu disappearance
        mobileMenuButton.classList.toggle("rotate-90");
        if (animate) {
          const animation = mobileMenu.animate(
            [
              { opacity: 1, transform: "translateY(0)" },
              { opacity: 0, transform: "translateY(-10px)" },
            ],
            { duration: 300, easing: "ease-in", fill: "forwards" }
          );

          animation.onfinish = () => {
            mobileMenu.classList.add("hidden");
          };
        } else {
          mobileMenu.style.opacity = "0";
          mobileMenu.style.transform = "translateY(-10px)";

          setTimeout(() => {
            mobileMenu.classList.add("hidden");
          }, 300);
        }

        // Change back to menu icon
        menuIcon.innerHTML = `
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        `;
      }

      const links = mobileMenu.querySelectorAll("a");
      links.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = menuOpen ? "1" : "0";
          link.style.transform = menuOpen ? "translateX(0)" : "translateX(4px)";
        }, index * 50);
      });
    });
  }

  // Show navigation links with staggered animation
  const navLinks = document.querySelectorAll("header .space-x-8 > a");
  navLinks.forEach((link) => {
    link.style.opacity = "1";
  });

  // Hero section animations
  const heroContent = document.querySelector("#hero-content");
  if (heroContent) {
    fadeInUp(heroContent);
  }

  const scrollIndicator = document.querySelector("#scroll-indicator");
  if (scrollIndicator) {
    infiniteBounce(scrollIndicator);
  }

  // About section animations
  const aboutTitle = document.querySelector("#about-heading");
  if (aboutTitle) {
    createIntersectionObserver(aboutTitle, (el) => fadeInUp(el));
  }

  const aboutContent = document.querySelector("#about-content");
  if (aboutContent) {
    createIntersectionObserver(aboutContent, (el) => fadeInUp(el, 200));
  }

  // Experience section animations
  const experienceTitle = document.querySelector("#experience-heading");
  if (experienceTitle) {
    createIntersectionObserver(experienceTitle, (el) => fadeInUp(el));
  }

  const experienceItems = document.querySelectorAll(".experience-item");
  experienceItems.forEach((item, index) => {
    createIntersectionObserver(item, (el) => fadeInUp(el, index * 100));
    scaleOnHover(item);
  });

  // Projects section animations
  const projectsTitle = document.querySelector("#projects-heading");
  if (projectsTitle) {
    createIntersectionObserver(projectsTitle, (el) => fadeInUp(el));
  }

  const projectCards = document.querySelectorAll(".project-item");
  projectCards.forEach((card, index) => {
    createIntersectionObserver(card, (el) => fadeInUp(el, index * 100));
    scaleOnHover(card);
  });

  // Contact section animations
  const contactTitle = document.querySelector("#contact-heading");
  if (contactTitle) {
    createIntersectionObserver(contactTitle, (el) => fadeInUp(el));
  }

  const contactInfo = document.querySelector("#contact-info");
  if (contactInfo) {
    createIntersectionObserver(contactInfo, (el) => fadeInUp(el, 100));
  }

  const socialLinks = document.querySelector("#contact-social-links");
  if (socialLinks) {
    createIntersectionObserver(socialLinks, (el) => fadeInUp(el, 200));
  }

  // Skills section animations
  const skillsTitle = document.querySelector("#skills-heading");
  if (skillsTitle) {
    createIntersectionObserver(skillsTitle, (el) => fadeInUp(el));
  }

  const skillCards = document.querySelectorAll(".skill-item");
  skillCards.forEach((card, index) => {
    createIntersectionObserver(card, (el) => fadeInUp(el, index * 100));
  });
});
