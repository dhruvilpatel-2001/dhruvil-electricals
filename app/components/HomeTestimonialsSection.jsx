export default function HomeTestimonialsSection({ testimonials }) {
  if (!testimonials?.length) return null;

  return (
    <section id="testimonials" className="py-5">
      <div className="container">

        <div className="text-center mb-5">
          <span className="section-tag text-primary fw-bold">Testimonials</span>
          <h2 className="section-title">What Customers Say</h2>
        </div>

        <div className="row g-4">
          {testimonials.map((t) => (
            <div className="col-md-4" key={t.id}>
              <div className="testi-card shadow-sm p-4">
                <p className="testi-text">“{t.message}”</p>
                
                <div className="d-flex align-items-center gap-3 mt-3">
                  <img src={t.avatar_url} className="rounded-circle" width="50" height="50" />
                  <div>
                    <h6 className="fw-bold mb-0">{t.name}</h6>
                    <small className="text-warning">{"★".repeat(t.rating)}</small>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
