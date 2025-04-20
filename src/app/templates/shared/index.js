tailwind.config = {
  darkMode: "class",
};

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dark-mode-toggle")?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });
  // Create nav mobile menu if it's hidden
  createMobileNavToggle();

  // Hero section animations - trigger immediately
  setTimeout(() => {
    const heroElements = document.querySelectorAll("#home .transform");
    heroElements.forEach((el) => {
      el.classList.add("opacity-100");
      el.classList.remove("opacity-0");

      if (el.classList.contains("translate-y-5")) {
        el.classList.remove("translate-y-5");
        el.classList.add("translate-y-0");
      }
    });
  }, 100);

  // Header animations - trigger immediately
  setTimeout(() => {
    const headerLinks = document.querySelectorAll("header a.transform");
    headerLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("opacity-100", "translate-y-0");
        link.classList.remove("opacity-0", "-translate-y-5");
      }, index * 100);
    });
  }, 100);

  // Setup Intersection Observer for all sections
  const sections = [
    "#about",
    "#experience",
    "#projects",
    "#skills",
    "#contact",
  ];

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;

        // Section-specific animations
        const sectionId = section.id;

        // Find all elements that should be animated in this section
        const animatedElements = section.querySelectorAll(".transform");

        if (animatedElements.length > 0) {
          animatedElements.forEach((element, index) => {
            // Apply staggered animation delay for each element
            setTimeout(() => {
              applyAnimation(element, true);
            }, index * 200);
          });
        } else {
          // If no direct children with transform class, look for the main container
          const mainContainer = section.querySelector('[class*="transform"]');
          if (mainContainer) {
            applyAnimation(mainContainer, true);
          }
        }

        // Special handling for specific sections
        if (sectionId === "experience") {
          const cards = section.querySelectorAll(".bg-black\\/20");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("opacity-100", "translate-x-0");
              card.classList.remove("opacity-0", "-translate-x-12");
            }, index * 200);
          });
        } else if (sectionId === "projects") {
          const cards = section.querySelectorAll(".bg-black\\/30");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("opacity-100", "translate-y-0");
              card.classList.remove("opacity-0", "translate-y-12");
            }, index * 200);
          });
        } else if (sectionId === "skills") {
          const cards = section.querySelectorAll(".bg-black\\/20");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("opacity-100", "translate-y-0");
              card.classList.remove("opacity-0", "translate-y-12");
            }, index * 200);
          });
        } else if (sectionId === "contact") {
          const container = section.querySelector(".max-w-2xl");
          if (container && container.classList.contains("transform")) {
            applyAnimation(container, true);
          }
        } else if (sectionId === "about") {
          const container = section.querySelector(".max-w-3xl");
          if (container && container.classList.contains("transform")) {
            applyAnimation(container, true);
          }
        }

        observer.unobserve(section);
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach((sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      observer.observe(section);
    }
  });
});
// Animation helper functions
function applyAnimation(element, isVisible) {
  if (element && element.classList.contains("transform")) {
    if (isVisible) {
      element.classList.add("opacity-100");

      if (element.classList.contains("-translate-x-12")) {
        element.classList.remove("-translate-x-12");
        element.classList.add("translate-x-0");
      } else if (
        element.classList.contains("translate-y-12") ||
        element.classList.contains("translate-y-5")
      ) {
        element.classList.remove("translate-y-12", "translate-y-5");
        element.classList.add("translate-y-0");
      } else if (element.classList.contains("-translate-y-5")) {
        element.classList.remove("-translate-y-5");
        element.classList.add("translate-y-0");
      }
    }
  }
}
function createMobileNavToggle() {
  const mobileMenuBtn = document.getElementById("mobile-menu-button");
  if (!mobileMenuBtn) return;

  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;

  // Initialize menu state
  initializeMobileMenu(mobileMenu);

  // Setup event listeners
  mobileMenuBtn.addEventListener("click", () =>
    handleMenuToggle(mobileMenu, mobileMenuBtn)
  );
  setupMenuItemsClickHandlers(mobileMenu, mobileMenuBtn);
}

function initializeMobileMenu(mobileMenu) {
  // Initial state
  mobileMenu.classList.add("hidden");
  mobileMenu.style.display = "none";
  mobileMenu.classList.add(
    "transition-all",
    "duration-300",
    "ease-in-out",
    "transform"
  );

  // Initialize menu items
  const mobileMenuItems = mobileMenu.querySelectorAll("a");
  mobileMenuItems.forEach((item, index) => {
    item.classList.add(
      "transition-all",
      "duration-300",
      "transform",
      "opacity-0",
      "translate-x-4"
    );
    item.style.transitionDelay = `${index * 50}ms`;
  });
}

function handleMenuToggle(mobileMenu, mobileMenuBtn) {
  const isCurrentlyHidden = mobileMenu.classList.contains("hidden");

  if (isCurrentlyHidden) {
    showMenu(mobileMenu, mobileMenuBtn);
  } else {
    hideMenu(mobileMenu, mobileMenuBtn);
  }
}

function showMenu(mobileMenu, mobileMenuBtn) {
  // Show menu container
  mobileMenu.classList.remove("hidden");
  mobileMenu.style.display = "block";

  // Animate menu container
  requestAnimationFrame(() => {
    mobileMenu.classList.add("opacity-100", "translate-y-0");
    mobileMenu.classList.remove("opacity-0", "-translate-y-5");
  });

  // Animate menu items
  const mobileMenuItems = mobileMenu.querySelectorAll("a");
  mobileMenuItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.remove("opacity-0", "translate-x-4");
      item.classList.add("opacity-100", "translate-x-0");
    }, index * 50);
  });

  // Update button state
  mobileMenuBtn.classList.add("rotate-90");
  updateMenuIcon(mobileMenuBtn, true);
}

function hideMenu(mobileMenu, mobileMenuBtn) {
  // Animate menu items out first
  const mobileMenuItems = mobileMenu.querySelectorAll("a");
  mobileMenuItems.forEach((item) => {
    item.classList.remove("opacity-100", "translate-x-0");
    item.classList.add("opacity-0", "translate-x-4");
  });

  // Animate menu container
  mobileMenu.classList.add("opacity-0", "-translate-y-5");
  mobileMenu.classList.remove("opacity-100", "translate-y-0");

  // Hide menu after animation
  setTimeout(() => {
    mobileMenu.classList.add("hidden");
    mobileMenu.style.display = "none";
  }, 300);

  // Update button state
  mobileMenuBtn.classList.remove("rotate-90");
  updateMenuIcon(mobileMenuBtn, false);
}

function updateMenuIcon(mobileMenuBtn, isOpen) {
  const menuIcon = mobileMenuBtn.querySelector("svg");
  if (!menuIcon) return;

  if (isOpen) {
    menuIcon.innerHTML = `<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`;
    menuIcon.classList.add("scale-110");
  } else {
    menuIcon.innerHTML = `<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`;
    menuIcon.classList.remove("scale-110");
  }
}

function setupMenuItemsClickHandlers(mobileMenu, mobileMenuBtn) {
  const mobileMenuItems = mobileMenu.querySelectorAll("a");
  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", () => hideMenu(mobileMenu, mobileMenuBtn));
  });
}
