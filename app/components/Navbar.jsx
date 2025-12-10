"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark-mode");
    } else if (!saved) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setIsDark(true);
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  // Smooth scroll WITHOUT showing # in URL
  const smoothScroll = (sectionId) => {
    setMobileMenu(false);

    const target = document.getElementById(sectionId);
    if (target) {
      window.history.replaceState(null, "", "/"); // remove # from URL
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogoClick = async () => {
    window.location.href = "/";
};


  return (
    <header
      className={`modern-navbar ${isDark ? "dark-nav" : ""} ${scrolled ? "nav-scrolled" : ""}`}
    >
      <nav className="container d-flex align-items-center justify-content-between">

        {/* Logo */}
        <div className="logo d-flex align-items-center gap-2" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <i className="ri-flashlight-fill fs-3 logo-icon"></i>
          <span className="fw-bold fs-3 brand-text">Dhruvil Electricals</span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav desktop-menu gap-4">
          <li><button onClick={() => smoothScroll("home")} className="nav-link fancy-link">Home</button></li>
          <li><button onClick={() => smoothScroll("about")} className="nav-link fancy-link">About</button></li>
          <li><button onClick={() => smoothScroll("services")} className="nav-link fancy-link">Services</button></li>
          <li><button onClick={() => smoothScroll("works")} className="nav-link fancy-link">Works</button></li>
          <li><button onClick={() => smoothScroll("testimonials")} className="nav-link fancy-link">Testimonials</button></li>
          <li><button onClick={() => smoothScroll("faq")} className="nav-link fancy-link">FAQ</button></li>
          <li><button onClick={() => smoothScroll("contact")} className="nav-link fancy-link">Contact</button></li>
        </ul>

        {/* Actions */}
        <div className="actions d-flex align-items-center gap-3">
          <button className="theme-btn" onClick={toggleTheme}>
            <i className={isDark ? "ri-sun-line" : "ri-moon-line"}></i>
          </button>

          {/* Mobile Menu Button */}
          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <i className="ri-menu-3-line"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenu ? "show" : ""}`}>
        <button className="mobile-link" onClick={() => smoothScroll("home")}>Home</button>
        <button className="mobile-link" onClick={() => smoothScroll("about")}>About</button>
        <button className="mobile-link" onClick={() => smoothScroll("services")}>Services</button>
        <button className="mobile-link" onClick={() => smoothScroll("works")}>Works</button>
        <button className="mobile-link" onClick={() => smoothScroll("testimonials")}>Testimonials</button>
        <button className="mobile-link" onClick={() => smoothScroll("faq")}>FAQ</button>
        <button className="mobile-link" onClick={() => smoothScroll("contact")}>Contact</button>
      </div>
    </header>
  );
}
