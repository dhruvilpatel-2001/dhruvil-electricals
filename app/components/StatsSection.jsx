import CounterScript from "./CounterScript";

export default function StatsSection({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="stats-strip bg-white shadow-sm">
      <div className="container">
        <div className="row text-center">
          {stats.map((item) => (
            <div key={item.id} className="col-md-3 py-4 border-end last-border-none">
              <div className="d-flex flex-column align-items-center gap-2">
                {item.icon && (
                  <div className="stat-icon-wrapper">
                    <i className={item.icon}></i>
                  </div>
                )}
                <h3 className="fw-bold fs-3 mb-0">{item.value}</h3>
                <p className="text-uppercase text-muted small mb-0">{item.label}</p>
              </div>
            </div>
          ))}
          <CounterScript />
        </div>
      </div>
    </section>
  );
}
