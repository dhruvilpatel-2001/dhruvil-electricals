import { supabase } from "../../lib/supabaseClient.js";

export default async function WorksPage() {
  const { data: works } = await supabase
    .from("works")
    .select("*")
    .order("id", { ascending: false });

  return (
    <section id="works" className="py-5 container">
      <h1 className="display-5 fw-bold mb-4 text-center">Our Work & Projects</h1>

      <div className="row gy-4">
        {works?.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="work-card shadow-sm rounded p-3">
              <img
                src={item.image_url}
                alt={item.title}
                className="img-fluid rounded mb-3"
              />
              <h4 className="fw-bold">{item.title}</h4>
              <p className="text-muted small">{item.description}</p>
              <span className="badge bg-primary">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
