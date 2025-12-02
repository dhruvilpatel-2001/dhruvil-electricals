export default function Hero() {
  return (
    <section className="hero-section position-relative d-flex align-items-center text-white">
      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Animated particles */}
      <div className="hero-particles"></div>

      <div className="container position-relative hero-content">

        {/* Badge */}
        <div className="hero-badge mb-3 d-inline-flex align-items-center px-3 py-1 rounded-pill fade-in-up">
          <i className="ri-flashlight-fill me-2 text-warning"></i>
          <span className="fw-semibold">Dhruvil Electricals</span>
        </div>

        {/* Title */}
        <h1 className="display-4 fw-bold hero-title fade-in-up delay-1">
          Expert <span className="hero-glow">Motor Rewinding</span> & <br />
          Precision Electrical Repair
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle lead mt-3 mb-4 fade-in-up delay-2">
          20+ years of trusted electrical repair, rewinding, and maintenance services.  
          Fast turnaround • OEM-grade quality • Affordable pricing.
        </p>

        {/* Buttons */}
        <div className="d-flex flex-wrap gap-3 hero-buttons fade-in-up delay-3">
          <a href="/services" className="btn hero-btn-primary btn-lg d-flex align-items-center gap-2">
            Explore Services <i className="ri-arrow-right-line"></i>
          </a>

          <a href="#contact" className="btn hero-btn-outline btn-lg d-flex align-items-center gap-2">
            <i className="ri-phone-line"></i> Contact Now
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator fade-in-up delay-4">
          <i className="ri-arrow-down-line"></i>
        </div>

      </div>
    </section>
  );
}
