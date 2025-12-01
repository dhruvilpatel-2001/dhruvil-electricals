import { supabase } from "@/lib/supabaseClient";

async function getData() {
  const [{ data: categories }, { data: services }, { data: pricing }] = await Promise.all([
    supabase.from("service_categories").select("*").order("id", { ascending: true }),
    supabase.from("detailed_services").select("*").order("id", { ascending: true }),
    supabase.from("pricing_packages").select("*").order("id", { ascending: true })
  ]);
  return { categories: categories || [], services: services || [], pricing: pricing || [] };
}

export default async function ServicesPage() {
  const { categories, services, pricing } = await getData();

  return (
    <>
      <section id="services" className="services-hero text-center text-white">
        <div className="container">
          <div className="breadcrumb-pill mb-3">
            Home <i className="ri-arrow-right-s-line mx-1"></i> <span>Services</span>
          </div>
          <h1 className="display-4 fw-bold mb-3">
            Professional Motor Rewinding &amp; Electrical Repair Solutions
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Expert solutions for industrial and domestic electrical needs. From precision motor
            rewinding to advanced circuit repairs, we restore power to your machines.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title text-white">Service Categories</h2>
            <p className="text-muted">Specialized departments for every electrical need</p>
          </div>
          <div className="row">
            {categories.map((cat) => (
              <div className="col-md-4 mb-4" key={cat.id}>
                <div className="category-card h-100 text-center">
                  <div className="cat-icon-box mx-auto mb-3">
                    {cat.icon && <i className={cat.icon}></i>}
                  </div>
                  <h3 className="h4 mb-2">{cat.name}</h3>
                  <p className="text-muted mb-0">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed services */}
      <section className="py-5 services-detailed bg-body-tertiary">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Complete Service List</h2>
          </div>
          <div className="row">
            {services.map((srv) => (
              <div className="col-md-4 mb-4" key={srv.id}>
                <div className="service-card-glass h-100 d-flex flex-column">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="srv-icon-box">
                      {srv.icon && <i className={srv.icon}></i>}
                    </div>
                    <h3 className="h5 mb-0">{srv.title}</h3>
                  </div>
                  <p className="text-muted small mb-3 flex-grow-1">{srv.description}</p>
                  <ul className="list-unstyled small mb-3">
                    {srv.feature_1 && (
                      <li>
                        <i className="ri-check-double-line text-warning me-1"></i>
                        {srv.feature_1}
                      </li>
                    )}
                    {srv.feature_2 && (
                      <li>
                        <i className="ri-check-double-line text-warning me-1"></i>
                        {srv.feature_2}
                      </li>
                    )}
                    {srv.feature_3 && (
                      <li>
                        <i className="ri-check-double-line text-warning me-1"></i>
                        {srv.feature_3}
                      </li>
                    )}
                  </ul>
                  <button type="button" className="btn btn-outline-primary mt-auto">
                    Learn More <i className="ri-arrow-right-line ms-1"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-5 pricing-section-dark">
        <div className="container">
          <div className="text-center mb-5 text-white">
            <h2 className="section-title text-white">Transparent Service Packages</h2>
            <p className="text-muted">
              Standardized pricing for common maintenance and repair needs
            </p>
          </div>
          <div className="row justify-content-center">
            {pricing.map((pkg) => (
              <div className="col-md-4 mb-4" key={pkg.id}>
                <div
                  className={
                    "price-card text-center h-100" + (pkg.is_popular ? " price-card-popular" : "")
                  }
                >
                  {pkg.is_popular && <div className="popular-tag">Most Popular</div>}
                  <h3 className="h5 mb-2">{pkg.name}</h3>
                  <div className="display-5 fw-bold text-primary mb-2">
                    {pkg.price}
                    <small className="fs-6 text-muted ms-1">/{pkg.period}</small>
                  </div>
                  <p className="text-muted small mb-3">{pkg.description}</p>
                  <button
                    type="button"
                    className={
                      "btn w-100 mt-2 " +
                      (pkg.is_popular ? "btn-primary" : "btn-outline-light border-secondary")
                    }
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
