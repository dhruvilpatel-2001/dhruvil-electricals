"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminShell({ title, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAdmin = typeof window !== "undefined" && localStorage.getItem("admin") === "true";
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  if (checking) {
    return (
      <div className="container py-5 text-center">
        <p>Checking admin access…</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo mb-4">
          <i className="ri-flashlight-fill"></i>
          <span>RE:WIND Admin</span>
        </div>

        <nav className="admin-nav">
          <Link
            href="/admin/dashboard"
            className={`admin-link ${pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            <i className="ri-dashboard-line"></i> Dashboard
          </Link>

          <Link
            href="/admin/works"
            className={`admin-link ${pathname.startsWith("/admin/works") ? "active" : ""}`}
          >
            <i className="ri-briefcase-line"></i> Works
          </Link>

          <Link
            href="/admin/testimonials"
            className={`admin-link ${pathname.startsWith("/admin/testimonials") ? "active" : ""}`}
          >
            <i className="ri-chat-1-line"></i> Testimonials
          </Link>

          <Link
            href="/admin/faq"
            className={`admin-link ${pathname.startsWith("/admin/faq") ? "active" : ""}`}
          >
            <i className="ri-question-line"></i> FAQ
          </Link>
        </nav>

        <button onClick={handleLogout} className="btn btn-sm btn-outline-light mt-auto">
          <i className="ri-logout-box-r-line me-1"></i> Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-header">
          <h1 className="h4 mb-0">{title}</h1>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
