import { redirect } from "next/navigation";

const validSections = [
  "home",
  "about",
  "services",
  "works",
  "faq",
  "contact",
  "testimonials"
];

export default function SectionRedirect({ params }) {
  const name = params.section;

  if (validSections.includes(name)) {
    return redirect("/#" + name);
  }

  // ❌ Unknown page → show 404
  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>404 — Page Not Found</h1>
    </div>
  );
}
