(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".site-nav a[href^=\"#\"]");

  function setMenuOpen(open) {
    if (!toggle) return;
    if (header) header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      setMenuOpen(!header.classList.contains("menu-open"));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setMenuOpen(false);
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header && header.classList.contains("menu-open")) {
      setMenuOpen(false);
    }
  });

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if ("IntersectionObserver" in window && header) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            header.classList.add("is-scrolled");
          } else {
            header.classList.remove("is-scrolled");
          }
        });
      },
      { rootMargin: "-40px 0px 0px 0px", threshold: 0 }
    );
    var hero = document.querySelector(".hero");
    if (hero) obs.observe(hero);
  }
})();
