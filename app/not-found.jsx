import { redirect } from "next/navigation";
import "./notfound.scss"; 
import Link from "next/link";


const validSections = [
  "home",
  "about",
  "services",
  "works",
  "faq",
  "contact",
  "testimonials"
];

export default function NotFound({ params = {} }) {
  const name = params.section || null;

  if (name && validSections.includes(name)) {
    return redirect("/#" + name);
  }

  return (
        <div className="nf-wrapper">
      <div className="nf-content">

        {/* Glowing 404 */}
        <h1 className="nf-404">404</h1>

        {/* Title */}
        <h2 className="nf-title">Page Not Found</h2>
        <p className="nf-subtitle">Oops! This page doesn’t exist</p>


        {/* Button */}
        <Link href="/" className="nf-home-btn">
          Return to Homepage →
        </Link>
      </div>
    </div>
  );
}
