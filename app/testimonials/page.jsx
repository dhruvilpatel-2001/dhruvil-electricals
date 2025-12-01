import { supabase } from "@/lib/supabaseClient";

export default async function TestimonialsPage() {
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: false });

  return (
    <section id="testimonials" className="py-5 container">
      <h1 className="display-5 fw-bold mb-4 text-center">Customer Testimonials</h1>

      <div className="row gy-4">
        {testimonials?.map((t) => (
          <div className="col-md-4" key={t.id}>
            <div className="testimonial-card p-4 shadow-sm rounded">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={t.avatar_url}
                  alt={t.name}
                  className="rounded-circle"
                  width="60"
                  height="60"
                />
                <div>
                  <h5 className="mb-0 fw-bold">{t.name}</h5>
                  <small className="text-warning">
                    {"★".repeat(t.rating)}
                  </small>
                </div>
              </div>
              <p className="text-muted">{t.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
