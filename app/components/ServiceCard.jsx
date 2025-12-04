export default function ServiceCard({ service }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="service-card h-100">
        <div className="service-card-img-wrapper">
          {service.image_url && (
            <img
              src={service.image_url}
              alt={service.title}
              className="service-card-img"
            />
          )}
          
        </div>
        <div className="service-card-body">
          <h3 className="service-card-title">{service.title}</h3>
          <p className="service-card-desc">{service.description}</p>
        </div>
      </div>
    </div>
  );
}
