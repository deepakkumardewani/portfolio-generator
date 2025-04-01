const { animate } = Motion;
// Animation utilities for Modern template
// const animate = (element, keyframes, options) => {
//   return element.animate(keyframes, options);
// };

// Fade in and slide up animation
const fadeInUp = (element, delay = 0) => {
  return animate(
    element,
    [
      { opacity: 0, transform: "translateY(20px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 600,
      delay,
      fill: "forwards",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    }
  );
};

// Infinite bounce animation for scroll indicator
const infiniteBounce = (element) => {
  return animate(
    element,
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
};

// Scale on hover animation
const scaleOnHover = (element) => {
  element.addEventListener("mouseenter", () => {
    animate(
      element,
      { transform: "scale(1.02)" },
      { duration: 200, easing: "ease-out" }
    );
  });
  element.addEventListener("mouseleave", () => {
    animate(
      element,
      { transform: "scale(1)" },
      { duration: 200, easing: "ease-out" }
    );
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
  // Hero section animations
  const heroContent = document.querySelector("#hero .container > div");
  if (heroContent) {
    fadeInUp(heroContent);
  }

  const scrollIndicator = document.querySelector("#hero .arrow-down");
  if (scrollIndicator) {
    infiniteBounce(scrollIndicator);
  }

  // About section animations
  const aboutTitle = document.querySelector("#about h2");
  if (aboutTitle) {
    createIntersectionObserver(aboutTitle, (el) => fadeInUp(el));
  }

  const aboutContent = document.querySelector("#about .prose");
  if (aboutContent) {
    createIntersectionObserver(aboutContent, (el) => fadeInUp(el, 200));
  }

  // Experience section animations
  const experienceTitle = document.querySelector("#experience h2");
  if (experienceTitle) {
    createIntersectionObserver(experienceTitle, (el) => fadeInUp(el));
  }

  const experienceItems = document.querySelectorAll(
    "#experience .space-y-12 > div"
  );
  experienceItems.forEach((item, index) => {
    createIntersectionObserver(item, (el) => fadeInUp(el, index * 100));
    scaleOnHover(item);
  });

  // Projects section animations
  const projectsTitle = document.querySelector("#projects h2");
  if (projectsTitle) {
    createIntersectionObserver(projectsTitle, (el) => fadeInUp(el));
  }

  const projectCards = document.querySelectorAll("#projects .grid > div");
  projectCards.forEach((card, index) => {
    createIntersectionObserver(card, (el) => fadeInUp(el, index * 100));
    scaleOnHover(card);
  });

  // Contact section animations
  const contactTitle = document.querySelector("#contact h2");
  if (contactTitle) {
    createIntersectionObserver(contactTitle, (el) => fadeInUp(el));
  }

  const contactInfo = document.querySelector(
    "#contact .grid > div:first-child"
  );
  if (contactInfo) {
    createIntersectionObserver(contactInfo, (el) => fadeInUp(el, 100));
  }

  const socialLinks = document.querySelector("#contact .grid > div:last-child");
  if (socialLinks) {
    createIntersectionObserver(socialLinks, (el) => fadeInUp(el, 200));
  }

  // Skills section animations
  const skillsTitle = document.querySelector("#skills h2");
  if (skillsTitle) {
    createIntersectionObserver(skillsTitle, (el) => fadeInUp(el));
  }

  const skillCards = document.querySelectorAll("#skills .grid > div");
  skillCards.forEach((card, index) => {
    createIntersectionObserver(card, (el) => fadeInUp(el, index * 100));
  });

  // Add gradient text effect
  //   const gradientTexts = document.querySelectorAll(".gradient-text");
  //   gradientTexts.forEach((text) => {
  //     text.style.backgroundImage = "linear-gradient(to right, #A78BFA, #EC4899)";
  //     text.style.backgroundClip = "text";
  //     text.style.webkitBackgroundClip = "text";
  //     text.style.color = "transparent";
  //   });
});

// Export animation functions
// export { fadeInUp, infiniteBounce, createIntersectionObserver, scaleOnHover };
