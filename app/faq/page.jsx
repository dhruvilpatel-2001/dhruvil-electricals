import { supabase } from "@/lib/supabaseClient";

export default async function FAQPage() {
  const { data: faq } = await supabase
    .from("faq")
    .select("*")
    .order("id", { ascending: true });

  return (
    <section id="faq" className="py-5 container">
      <h1 className="display-5 fw-bold mb-4 text-center">Frequently Asked Questions</h1>

      <div className="accordion" id="faqAccordion">
        {faq?.map((item) => (
          <div className="accordion-item mb-2" key={item.id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq-${item.id}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`faq-${item.id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
