const animate = window.Motion?.animate;

const themeToggle = () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  toggleBtn.classList.add("text-yellow-300");
  toggleBtn.innerHTML = `<i data-lucide="sun"></i>`;
  root.classList.add("dark");
  toggleBtn.addEventListener("click", () => {
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    toggleBtn.classList.toggle("text-yellow-300");
    toggleBtn.innerHTML = isDark
      ? `<i data-lucide="sun"></i>`
      : `<i data-lucide="moon"></i>`;

    // Re-render the Lucide icon after injecting it
    lucide.createIcons();
  });

  lucide.createIcons();
};

const mobileMenu = () => {
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
};

const navLinks = () => {
  // Show navigation links with staggered animation
  const navLinks = document.querySelectorAll("header .space-x-8 > a");
  navLinks.forEach((link) => {
    link.style.opacity = "1";
  });

  // Add animation to resume button
  const resumeButton = document.getElementById("resume-button");
  if (resumeButton) {
    fadeInUp(resumeButton);

    // Add hover effect to resume button
    resumeButton.addEventListener("mouseenter", () => {
      if (animate) {
        resumeButton.animate(
          { transform: "scale(1.05)" },
          { duration: 200, easing: "ease-out", fill: "forwards" }
        );
      }
    });

    resumeButton.addEventListener("mouseleave", () => {
      if (animate) {
        resumeButton.animate(
          { transform: "scale(1)" },
          { duration: 200, easing: "ease-out", fill: "forwards" }
        );
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  themeToggle();
  mobileMenu();
  navLinks();
});
