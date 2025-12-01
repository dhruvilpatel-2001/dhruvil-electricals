export default function Hero() {
  return (
    <section className="hero position-relative d-flex align-items-center text-white">
      <div className="hero-overlay" />
      <div className="container position-relative">
        <div className="badge rounded-pill px-3 py-2 mb-4 d-inline-flex align-items-center gap-2 hero-badge">
          <i className="ri-award-line"></i>
          <span>ISO 9001 Certified</span>
        </div>
        <h1 className="display-3 fw-bold mb-3 hero-title">
          Rewinding Pros <br />
          <span className="text-accent">Electrical Repair</span>
        </h1>
        <p className="lead mb-4 hero-subtitle">
          Premium motor rewinding and electrical maintenance services. We bring power back to your
          machinery with precision engineering and fast turnaround.
        </p>
        <div className="d-flex gap-3 hero-actions">
          <a href="/services" className="btn btn-warning btn-lg d-flex align-items-center gap-2">
            Explore Services <i className="ri-arrow-right-line"></i>
          </a>
          <a href="#contact" className="btn btn-outline-light btn-lg d-flex align-items-center gap-2">
            <i className="ri-phone-line"></i> Contact Now
          </a>
        </div>
      </div>
    </section>
  );
}
