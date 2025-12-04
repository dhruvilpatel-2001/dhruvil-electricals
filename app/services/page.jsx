import AutoResizeImage from "../components/AutoResizeImage";

export default async function ServicesPage() {
  const { categories } = await getData();

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <span className="text-primary fw-bold">OUR EXPERTISE</span>
          <h2 className="fw-bold mt-2">Comprehensive Repair Solutions</h2>
          <p className="text-muted">
            From submersible pumps to ceiling fans, we handle all types of rewinding and electrical repair work.
          </p>
        </div>

        <div className="row g-4">
          {categories.map((cat) => (
            <div className="col-md-4" key={cat.id}>
              <div className="service-card h-100">

                <div className="service-card-img-wrapper">
                  <AutoResizeImage
                    src={cat.image_url}
                    alt={cat.name}
                    maxWidth={1200}   // auto-resize width
                  />
                </div>

                <div className="service-card-body">
                  <h3 className="service-card-title">{cat.name}</h3>
                  <p className="service-card-desc">{cat.description}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
