export default function WhyChooseSection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="why-section text-white">
      <div className="container d-flex flex-column flex-lg-row align-items-center gap-5">
        <div className="why-text flex-grow-1">
          <span className="section-tag text-accent text-uppercase fw-bold mb-2 d-block">
            Why Choose Rewinding Pros
          </span>
          <h2 className="section-title mb-4 text-white">Engineered for Reliability</h2>
          <div className="why-items">
            {items.map((item) => (
              <div key={item.id} className="why-item d-flex gap-3 mb-4">
                <div className="why-icon">
                  {item.icon && <i className={item.icon}></i>}
                </div>
                <div>
                  <h4 className="fw-bold mb-1">{item.title}</h4>
                  <p className="mb-0 text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-image flex-shrink-0" />
      </div>
    </section>
  );
}
