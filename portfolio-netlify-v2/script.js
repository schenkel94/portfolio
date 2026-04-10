const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelectorAll(".nav-link");
const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const year = document.getElementById("year");

const setHeaderState = () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 12);
};

const setActiveNav = () => {
  const sections = [...document.querySelectorAll("main section[id]")];
  let currentId = "home";

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const rect = sections[index].getBoundingClientRect();
    if (rect.top <= 120) {
      currentId = sections[index].id;
      break;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

const closeMobileMenu = () => {
  mobileMenu.hidden = true;
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

const openMobileMenu = () => {
  mobileMenu.hidden = false;
  menuToggle.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
};

menuToggle.addEventListener("click", () => {
  if (mobileMenu.hidden) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeAllModals = () => {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("modal-open");
};

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modalOpen));
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeAllModals);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-backdrop")) {
    closeAllModals();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeAllModals();
  }
});

window.addEventListener("scroll", () => {
  setHeaderState();
  setActiveNav();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && !mobileMenu.hidden) {
    closeMobileMenu();
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

setHeaderState();
setActiveNav();
