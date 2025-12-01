import ServiceCard from "./ServiceCard";

export default function HomeServicesSection({ services }) {
  return (
    <section className="py-5 bg-light" id="services">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag d-block text-primary text-uppercase fw-bold mb-2">
            Our Expertise
          </span>
          <h2 className="section-title mb-3">Comprehensive Repair Solutions</h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "600px" }}>
            From submersible pumps to ceiling fans, we handle all types of rewinding and electrical repair work.
          </p>
        </div>
        <div className="row">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
