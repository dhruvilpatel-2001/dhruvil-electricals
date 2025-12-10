"use client";

export function smoothScrollTo(id) {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
