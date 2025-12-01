export default function CTASection({ cta }) {
  if (!cta) return null;

  return (
    <section className="cta-section text-white">
      <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
        <div>
          <h2 className="cta-title mb-2">{cta.heading}</h2>
          <p className="cta-subtitle mb-0">{cta.subtext}</p>
        </div>
        <a href={cta.button_link || "#contact"} className="btn btn-warning btn-lg rounded-pill d-flex align-items-center gap-2">
          <i className="ri-chat-smile-2-line"></i>
          {cta.button_text || "Contact Us"}
        </a>
      </div>
    </section>
  );
}
