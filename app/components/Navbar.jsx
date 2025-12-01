"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // User has set theme before
      setIsDark(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
      }
    } else {
      // Detect OS theme (first time visitor)
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

  return (
    <header className={`modern-navbar ${isDark ? "dark-nav" : ""} ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="container d-flex align-items-center justify-content-between">

        {/* Logo */}
        <div className="logo d-flex align-items-center gap-2">
          <i className="ri-flashlight-fill fs-3 logo-icon"></i>
          <span className="fw-bold fs-3 brand-text">Dhruvil Electricals</span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav desktop-menu gap-4">
          <li><Link href="/" className="nav-link fancy-link">Home</Link></li>
          <li><a href="#about" className="nav-link fancy-link">About</a></li>
          <li><Link href="#services" className="nav-link fancy-link">Services</Link></li>
          <li><Link href="#works" className="nav-link fancy-link">Works</Link></li>
          <li><Link href="#testimonials" className="nav-link fancy-link">Testimonials</Link></li>
          <li><Link href="#faq" className="nav-link fancy-link">FAQ</Link></li>
          <li><a href="#contact" className="nav-link fancy-link">Contact</a></li>
        </ul>

        {/* Actions */}
        <div className="actions d-flex align-items-center gap-3">
          {/* Theme Toggle Button */}
          <button className="theme-btn" onClick={toggleTheme}>
            <i className={isDark ? "ri-sun-line" : "ri-moon-line"}></i>
          </button>

          {/* CTA */}
          <a href="#contact" className="btn btn-primary btn-cta">Get Quote</a>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <i className="ri-menu-3-line"></i>
          </button>
        </div>

      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenu ? "show" : ""}`}>
        <a href="/" className="mobile-link">Home</a>
        <a href="/services" className="mobile-link">Services</a>
        <a href="#about" className="mobile-link">About</a>
        <a href="#contact" className="mobile-link">Contact</a>
      </div>
    </header>
  );
}
