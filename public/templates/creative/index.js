const animate = window.Motion?.animate;

// Helper functions for animations
const fadeInUp = (element, delay = 0, y = 20) => {
  if (!animate) {
    console.error("Motion.animate is not available");
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    return null;
  }

  try {
    return element.animate(
      [
        { opacity: 0, transform: `translateY(${y}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 500,
        delay,
        fill: "forwards",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    );
  } catch (error) {
    console.error("Animation error:", error);
    // Fallback to direct style setting
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    return null;
  }
};

const fadeInLeft = (element, delay = 0, x = -48) => {
  if (!animate) {
    console.error("Motion.animate is not available");
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
    return null;
  }

  try {
    return element.animate(
      [
        { opacity: 0, transform: `translateX(${x}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      {
        duration: 500,
        delay,
        fill: "forwards",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    );
  } catch (error) {
    console.error("Animation error:", error);
    // Fallback to direct style setting
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
    return null;
  }
};

const scaleOnHover = (element) => {
  if (!animate) {
    console.error("Motion.animate is not available");
    return;
  }

  element.addEventListener("mouseenter", () => {
    try {
      element.animate(
        { transform: "scale(1.05)" },
        { duration: 200, easing: "ease-out", fill: "forwards" }
      );
    } catch (error) {
      console.error("Animation error:", error);
      element.style.transform = "scale(1.05)";
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
    console.warn("Motion library is not loaded. Using fallbacks.");
    // Apply fallback styles to make content visible
    document.querySelectorAll('[style*="opacity: 0"]').forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }

  // Set dark mode by default for Creative template
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
  const heroContainer = document.querySelector("#creative-hero-container");
  const heroTitle = document.querySelector("#creative-hero-title");
  const heroTagline = document.querySelector("#creative-hero-tagline");
  const heroSocial = document.querySelector("#creative-hero-social");

  if (heroContainer) fadeInUp(heroContainer, 0, 20);
  if (heroTitle) fadeInUp(heroTitle, 200, 20);
  if (heroTagline) fadeInUp(heroTagline, 400, 20);
  if (heroSocial) fadeInUp(heroSocial, 600, 20);

  // About section animations with intersection observer
  const aboutContainer = document.querySelector("#creative-about-container");
  const aboutHeading = document.querySelector("#creative-about-heading");
  const aboutContent = document.querySelector("#creative-about-content");

  if (aboutContainer)
    createIntersectionObserver(aboutContainer, (el) => fadeInUp(el, 0, 48));
  if (aboutHeading)
    createIntersectionObserver(aboutHeading, (el) => fadeInUp(el, 200));
  if (aboutContent)
    createIntersectionObserver(aboutContent, (el) => fadeInUp(el, 300, 20));

  // Experience section animations
  const experienceHeading = document.querySelector(
    "#creative-experience-heading"
  );
  if (experienceHeading)
    createIntersectionObserver(experienceHeading, (el) => fadeInUp(el));

  const experienceItems = document.querySelectorAll(
    'div[id^="creative-experience-card-"]'
  );
  experienceItems.forEach((item, index) => {
    createIntersectionObserver(item, (el) => fadeInLeft(el, index * 200));
  });

  // Projects section animations
  const projectsHeading = document.querySelector("#creative-projects-heading");
  if (projectsHeading)
    createIntersectionObserver(projectsHeading, (el) => fadeInUp(el));

  const projectItems = document.querySelectorAll(
    'div[id^="creative-project-card-"]'
  );
  projectItems.forEach((item, index) => {
    createIntersectionObserver(item, (el) => fadeInUp(el, index * 200, 48));
    scaleOnHover(item);
  });

  // Skills section animations
  const skillsHeading = document.querySelector("#creative-skills-heading");
  if (skillsHeading)
    createIntersectionObserver(skillsHeading, (el) => fadeInUp(el));

  const skillItems = document.querySelectorAll(
    'div[id^="creative-skill-card-"]'
  );
  skillItems.forEach((item, index) => {
    createIntersectionObserver(item, (el) => fadeInUp(el, index * 150, 48));
  });

  // Contact section animations
  const contactContainer = document.querySelector(
    "#creative-contact-container"
  );
  const contactHeading = document.querySelector("#creative-contact-heading");
  const contactText = document.querySelector("#creative-contact-text");
  const contactLinks = document.querySelector("#creative-contact-links");

  if (contactContainer)
    createIntersectionObserver(contactContainer, (el) => fadeInUp(el, 0, 48));
  if (contactHeading)
    createIntersectionObserver(contactHeading, (el) => fadeInUp(el, 200));
  if (contactText)
    createIntersectionObserver(contactText, (el) => fadeInUp(el, 300));
  if (contactLinks)
    createIntersectionObserver(contactLinks, (el) => fadeInUp(el, 400, 20));

  // Add hover animations to contact links
  const contactLinkElements = document.querySelectorAll(
    "#creative-contact-links a"
  );
  contactLinkElements.forEach((link) => {
    scaleOnHover(link);
  });
});
